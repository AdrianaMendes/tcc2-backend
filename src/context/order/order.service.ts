import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EOrderStatus } from '../../shared/enum/order-status.enum';
import { CreateOrderProductDto } from '../order-product/dto/create-order-product.dto';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
	) {}

	async openOrder(dto: CreateOrderDto): Promise<UpdateResult> {
		dto.totalValue = 0;

		const user = await this.userRepository.findOne(dto.userId);
		delete dto.userId;

		if (!user) {
			throw new HttpException(`Não há usuário com id: ${dto.userId}`, HttpStatus.NOT_FOUND);
		}

		let order: OrderEntity = await this.orderRepository.findOne({
			relations: ['orderProductArr', 'orderProductArr.product'],
			where: { status: EOrderStatus.OPEN, user: user.id },
		});

		if (!order) {
			order = await this.orderRepository.save({ ...dto, user });
		}

		let orderProductArr: OrderProductEntity[] = order.orderProductArr;
		delete order.orderProductArr;

		// Remove
		for (const [index, obj] of orderProductArr.entries()) {
			const isRemoved: boolean = dto.orderProductArr.filter((x) => x.productId === obj.product.id).length === 0;
			if (isRemoved) {
				orderProductArr[index] = undefined;
				await this.removeOrderProduct(obj.id);
			}
		}

		orderProductArr = orderProductArr.filter((x) => x !== undefined);

		// Update
		for (const obj of orderProductArr) {
			const isUpdated = dto.orderProductArr.find(
				(x) => x.productId === obj.product.id && x.amount !== obj.amount,
			);

			if (isUpdated) {
				await this.updateOrderProduct(obj.id, isUpdated.amount);
			}
		}

		// Create
		for (const i of dto.orderProductArr) {
			const isNew: boolean = orderProductArr.filter((x) => x.product.id === i.productId).length === 0;
			if (isNew) {
				orderProductArr.push(await this.createOrderProduct({ ...i, orderId: order.id }, order));
			}
		}

		order.totalValue = this.getTotalValueOrder(orderProductArr);

		const result = await this.orderRepository.update(order.id, order);

		if (result.affected === 0) {
			throw new HttpException('Erro ao gerar o carrinho', HttpStatus.BAD_REQUEST);
		}

		return result;
	}

	async findAll(): Promise<OrderEntity[]> {
		const orderArr = await this.orderRepository.find({ relations: ['orderProductArr', 'orderProductArr.product'] });

		if (orderArr.length === 0) {
			throw new HttpException('Não há pedido cadastrado', HttpStatus.NO_CONTENT);
		}

		return orderArr;
	}

	async findOne(id: number): Promise<OrderEntity> {
		const order = await this.orderRepository.findOne(id, { relations: ['orderProductArr', 'orderProductArr.product'] });

		if (!order) {
			throw new HttpException(`Não há pedido com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return order;
	}

	async remove(id: number): Promise<DeleteResult> {
		return await this.orderRepository.delete(id);
	}

	private async createOrderProduct(dto: CreateOrderProductDto, order: OrderEntity): Promise<OrderProductEntity> {
		const product = await this.productRepository.findOne(dto.productId, { where: { isActive: true } });

		if (!product) {
			throw new HttpException(`Não há produto com id: ${dto.productId}`, HttpStatus.NOT_FOUND);
		}

		if (dto.amount > product.amount) {
			throw new HttpException('Estoque insuficente de produto', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		// Remove a quantidade de produto no estoque
		product.amount -= dto.amount;
		dto.originalProductValue = product.value;

		return await this.orderProductRepository.save({ ...dto, product, order });
	}

	private async updateOrderProduct(id: number, amount: number): Promise<OrderProductEntity> {
		if (amount <= 0) {
			throw new HttpException(
				`A quantidade não pode ser menor ou igual a 0. Valor informado: ${amount}`,
				HttpStatus.BAD_REQUEST,
			);
		}

		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		const product = orderProduct.product;

		if (amount > product.amount) {
			throw new HttpException('Estoque insuficente de produto', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		// Atualiza o estoque
		product.amount = product.amount + orderProduct.amount - amount;

		// Atualiza a quantidade do pedido
		orderProduct.amount = amount;

		await this.orderProductRepository.update(orderProduct.id, orderProduct);
		await this.productRepository.update(product.id, product);

		return orderProduct;
	}

	async removeOrderProduct(id: number): Promise<DeleteResult> {
		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		const product = orderProduct.product;

		// Repõem o estoque de produto
		product.amount += orderProduct.amount;

		const result = await this.orderProductRepository.delete(id);
		await this.productRepository.update(product.id, product);

		return result;
	}

	private getTotalValueOrder(orderProductArr: OrderProductEntity[]): number {
		let value = 0;
		for (const iterator of orderProductArr) {
			value += iterator.originalProductValue * iterator.amount;
		}
		return value;
	}
}
