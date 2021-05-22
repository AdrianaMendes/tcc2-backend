import { Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
	) { }

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		const { name, description, image, amount, value, categoryId } = dto;
		const newEntity = new ProductEntity(name, description, image, amount, value);
		newEntity.category = await this.categoryRepository.findOne(categoryId);
		const result = await this.productRepository.save(newEntity);
		return result;
	}

	async findAll(): Promise<ProductEntity[]> {
		const entityArr = await this.productRepository.find();
		/*
		for (const entity of entityArr) {
			entity.category = await this.categoryRepository.findOne({ relations: ['productArr'] });
			delete entity.category['productArr'];
		}
		*/
		return entityArr;
	}

	async findOne(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id);
		/*
		result.category = await this.categoryRepository.findOne({ relations: ['productArr'] });
		*/
		delete result.category['productArr'];
		return result;
	}

	async update(id: number, dto: UpdateProductDto): Promise<UpdateResult> {
		const { name, description, image, amount, value, categoryId } = dto;
		const updateEntity = new ProductEntity(name, description, image, amount, value);
		updateEntity.category = await this.categoryRepository.findOne(categoryId);
		const result = await this.productRepository.update(id, updateEntity);
		return result;
	}

	async toggleAvailability(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id);
		result.toggleAvailability();
		this.productRepository.save(result);
		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		const result = await this.productRepository.delete(id);
		return result;
	}
}
