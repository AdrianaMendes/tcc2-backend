import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FileEntity } from '../file/entities/image.entity';
import { FileService } from '../file/file.service';
import { ProductEntity } from '../product/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		private fileService: FileService
	) {}

	async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
		return await this.categoryRepository.save(dto);
	}

	async findAll(): Promise<CategoryEntity[]> {
		const categoryArr = await this.categoryRepository.find({ relations: ['image'] });

		if (categoryArr.length === 0) {
			throw new HttpException('Não há categoria cadastrada', HttpStatus.NO_CONTENT);
		}

		return categoryArr;
	}

	async findOne(id: number): Promise<CategoryEntity> {
		const category = await this.categoryRepository.findOne(id);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return category;
	}

	async findAllProduct(id: number, isActive: boolean): Promise<ProductEntity[]> {
		const category = await this.categoryRepository.findOne(id);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		const productArr = isActive
			? await this.productRepository.find({ where: { category: id, isActive: true } })
			: await this.productRepository.find({ where: { category: id } });

		if (productArr.length === 0) {
			throw new HttpException(`Não há produto cadastrado com a categoria de id: ${id}`, HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async image(id: number, imageBuffer: Buffer, filename: string): Promise<FileEntity> {
		const category = await this.categoryRepository.findOne(id, { relations: ['image'] });

		if (category.image) {
			await this.categoryRepository.update(id, { image: null });
			await this.fileService.removeFile(category.image.id);
		}

		const image = await this.fileService.uploadFile(imageBuffer, filename);

		await this.categoryRepository.update(id, {
			...category,
			image
		});

		return image;
	}

	async update(id: number, dto: UpdateCategoryDto): Promise<UpdateResult> {
		const result = await this.categoryRepository.update(id, dto);

		if (result.affected === 0) {
			throw new HttpException(`Não há categoria com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		return await this.categoryRepository.delete(id);
	}
}
