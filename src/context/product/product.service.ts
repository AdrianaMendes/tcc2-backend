import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICommonService } from '../../shared/interface/common-service.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService implements ICommonService<ProductEntity, CreateProductDto, UpdateProductDto> {

	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
	) { }

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		const { name, description, image, amount, value, categoryId } = dto;
		const category: CategoryEntity = await this.categoryRepository.findOne(categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${categoryId}`, HttpStatus.NOT_FOUND);
		}

		const newEntity = new ProductEntity(name, description, image, amount, value);
		newEntity.category = category;
		const result = await this.productRepository.save(newEntity);
		return result;
	}

	async findAll(): Promise<ProductEntity[]> {
		const entityArr = await this.productRepository.find({ relations: ['category'] });

		if (entityArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return entityArr;
	}

	async findOne(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id, { relations: ['category'] });

		if (!result) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async update(id: number, dto: UpdateProductDto): Promise<UpdateResult> {
		const { name, description, image, amount, value, categoryId } = dto;
		const updateEntity = new ProductEntity(name, description, image, amount, value);
		const category = await this.categoryRepository.findOne(categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${categoryId}`, HttpStatus.NOT_FOUND);
		}

		updateEntity.category = category;

		const result = await this.productRepository.update(id, updateEntity);

		if (result.affected === 0) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async toggleAvailability(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id);

		if (!result) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		result.toggleAvailability();
		this.productRepository.save(result);
		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		const result = await this.productRepository.delete(id);
		return result;
	}
}
