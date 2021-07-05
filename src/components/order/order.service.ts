import { Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EOrderStatus } from '../../assets/enum/order-status.enum';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderEnumDto } from './dto/update-order-enum.dto';
import { OrderProductEntity } from './entities/order-product.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>
	) {}

	async openOrder(dto: CreateOrderDto, user: UserEntity): Promise<UpdateResult> {
		let order: OrderEntity = await this.orderRepository.findOne({
			relations: ['orderProductArr', 'orderProductArr.product'],
			where: { status: EOrderStatus.OPEN, user: user.id }
		});

		if (!order) {
			order = await this.orderRepository.save({ user });
		}

		let orderProductArr: OrderProductEntity[] = order.orderProductArr !== undefined ? order.orderProductArr : [];
		delete order.orderProductArr;

		// Remove
		for (const [index, obj] of orderProductArr.entries()) {
			const isRemoved: boolean = dto.orderProductDtoArr.filter(x => x.productId === obj.product.id).length === 0;
			if (isRemoved) {
				orderProductArr[index] = undefined;
				await this.removeOrderProduct(obj.id, true);
			}
		}

		orderProductArr = orderProductArr.filter(x => x !== undefined);

		// Update
		for (const obj of orderProductArr) {
			const isUpdated = dto.orderProductDtoArr.find(
				x => x.productId === obj.product.id && x.amount !== obj.amount
			);

			if (isUpdated) {
				await this.updateOrderProduct(obj.id, isUpdated.amount, true);
			}
		}

		// Create
		for (const i of dto.orderProductDtoArr) {
			const isNew: boolean = orderProductArr.filter(x => x.product.id === i.productId).length === 0;
			if (isNew) {
				orderProductArr.push(await this.createOrderProduct({ ...i }, order, true));
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
		const orderArr = await this.orderRepository.find({
			relations: ['user', 'orderProductArr', 'orderProductArr.product', 'orderProductArr.product.category']
		});

		if (orderArr.length === 0) {
			throw new HttpException('Não há pedido cadastrado', HttpStatus.NO_CONTENT);
		}

		return orderArr;
	}

	async findOne(id: number): Promise<OrderEntity> {
		const order = await this.orderRepository.findOne(id, { relations: ['orderProductArr'] });

		if (!order) {
			throw new HttpException(`Não há pedido com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return order;
	}

	async update(dto: UpdateOrderEnumDto): Promise<boolean> {
		const result = await this.orderRepository.update(dto.id, dto);

		if (result.affected === 0) {
			throw new HttpException(`Não foi possível atualizar o pedido, id: ${dto.id}`, HttpStatus.NOT_FOUND);
		}

		return true;
	}

	async remove(id: number): Promise<boolean> {
		return (await this.orderRepository.delete(id)).affected !== 0;
	}

	private async createOrderProduct(
		dto: CreateOrderProductDto,
		order: OrderEntity,
		isOpen: boolean
	): Promise<OrderProductEntity> {
		const product = await this.productRepository.findOne(dto.productId, { where: { isActive: true } });

		if (!product) {
			throw new HttpException(`Não há produto com id: ${dto.productId}`, HttpStatus.NOT_FOUND);
		}

		if (dto.amount > product.amount) {
			throw new HttpException('Estoque insuficente de produto', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		// Remove a quantidade de produto no estoque
		if (!isOpen) {
			product.amount -= dto.amount;
		}

		dto.originalProductValue = product.value;

		return await this.orderProductRepository.save({ ...dto, product, order });
	}

	private async updateOrderProduct(id: number, amount: number, isOpen: boolean): Promise<OrderProductEntity> {
		if (amount <= 0) {
			throw new HttpException(
				`A quantidade não pode ser menor ou igual a 0. Valor informado: ${amount}`,
				HttpStatus.BAD_REQUEST
			);
		}

		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		if (!isOpen) {
			const product = orderProduct.product;

			if (amount > product.amount) {
				throw new HttpException('Estoque insuficente de produto', HttpStatus.UNPROCESSABLE_ENTITY);
			}

			// Atualiza o estoque
			product.amount = product.amount + orderProduct.amount - amount;
			await this.productRepository.update(product.id, product);
		}

		// Atualiza a quantidade do pedido
		orderProduct.amount = amount;
		await this.orderProductRepository.update(orderProduct.id, orderProduct);

		return orderProduct;
	}

	async removeOrderProduct(id: number, isOpen: boolean): Promise<void> {
		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		// Repõem o estoque de produto
		if (!isOpen) {
			const product = orderProduct.product;
			product.amount += orderProduct.amount;
			await this.productRepository.update(product.id, product);
		}

		await this.orderProductRepository.delete(id);
	}

	private getTotalValueOrder(orderProductArr: OrderProductEntity[]): number {
		let value = 0;
		for (const iterator of orderProductArr) {
			value += iterator.originalProductValue * iterator.amount;
		}
		return value;
	}
}
