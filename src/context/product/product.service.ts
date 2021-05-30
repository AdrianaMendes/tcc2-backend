import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICommonServiceSoftDelete } from '../../shared/interface/common-service-soft-delete.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService implements ICommonServiceSoftDelete<ProductEntity, CreateProductDto, UpdateProductDto> {

	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
	) { }

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		const category = await this.categoryRepository.findOne(dto.categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${dto.categoryId}`, HttpStatus.NOT_FOUND);
		}

		return await this.productRepository.save({ ...dto, category });
	}

	async findAll(): Promise<ProductEntity[]> {
		const productArr = await this.productRepository.find({ relations: ['category'] });

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async findAllActive(): Promise<ProductEntity[]> {
		const productArr = await this.productRepository.find({ relations: ['category'], where: { isActive: true } });

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async findOne(id: number): Promise<ProductEntity> {
		const product = await this.productRepository.findOne(id, { relations: ['category'] });

		if (!product) {
			throw new HttpException(`Não há produto com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return product;
	}

	async findOneActive(id: number): Promise<ProductEntity> {
		const product = await this.productRepository.findOne(id, { relations: ['category'], where: { isActive: true } });

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
