import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
	) {}

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		const category = await this.categoryRepository.findOne(dto.categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${dto.categoryId}`, HttpStatus.NOT_FOUND);
		}

		return await this.productRepository.save({ ...dto, category });
	}

	async findAll(isActive: boolean): Promise<ProductEntity[]> {
		const productArr = isActive
			? await this.productRepository.find({ relations: ['category'], where: { isActive: true } })
			: await this.productRepository.find({ relations: ['category'] });

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async findOne(id: number, isActive: boolean): Promise<ProductEntity> {
		const product = isActive
			? await this.productRepository.findOne(id, { relations: ['category'], where: { isActive: true } })
			: await this.productRepository.findOne(id, { relations: ['category'] });

		if (!product) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return product;
	}

	async update(id: number, dto: UpdateProductDto): Promise<UpdateResult> {
		const category = await this.categoryRepository.findOne(dto.categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${dto.categoryId}`, HttpStatus.NOT_FOUND);
		}

		delete dto.categoryId;

		const result = await this.productRepository.update(id, { ...dto, category });

		if (result.affected === 0) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async toggleAvailability(id: number): Promise<ProductEntity> {
		const product = await this.productRepository.findOne(id);

		if (!product) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		product.toggleAvailability();

		return await this.productRepository.save(product);
	}

	async remove(id: number): Promise<DeleteResult> {
		return await this.productRepository.delete(id);
	}
}
