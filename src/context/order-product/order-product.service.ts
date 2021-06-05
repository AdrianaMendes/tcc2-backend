import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from '../product/entities/product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { OrderProductEntity } from './entities/order-product.entity';

@Injectable()
export class OrderProductService {
	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
	) {}

	async create(dto: CreateOrderProductDto): Promise<OrderProductEntity> {
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

		return await this.orderProductRepository.save({ ...dto, product });
	}

	async findAll(): Promise<OrderProductEntity[]> {
		const orderProductArr = await this.orderProductRepository.find({ relations: ['product'] });

		if (orderProductArr.length === 0) {
			throw new HttpException('Não há pedido de produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return orderProductArr;
	}

	async findOne(id: number): Promise<OrderProductEntity> {
		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return orderProduct;
	}

	async update(id: number, amount: number): Promise<UpdateResult> {
		if (amount <= 0) {
			throw new BadRequestException(`A quantidade não pode ser menor ou igual a 0. Valor informado: ${amount}`);
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

		const result = await this.orderProductRepository.update(orderProduct.id, orderProduct);
		await this.productRepository.update(product.id, product);

		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		const orderProduct = await this.orderProductRepository.findOne(id, { relations: ['product'] });

		if (!orderProduct) {
			throw new HttpException(`Não há pedido do produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		const product = orderProduct.product;

		// Repõem a quantidade o estoque de produto
		product.amount += orderProduct.amount;

		const result = await this.orderProductRepository.delete(id);
		await this.productRepository.update(product.id, product);

		return result;
	}
}
