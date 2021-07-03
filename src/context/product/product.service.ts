import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ImageService } from '../image/image.service';
import { ImageEntity } from '../image/entities/image.entity';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from '../../assets/interface/environment-variables.interface';

@Injectable()
export class ProductService {
	private imageService: ImageService;

	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
		@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>,
		private configService: ConfigService<IEnvironmentVariables>
	) {
		this.imageService = new ImageService(imageRepository, configService);
	}

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		const category = await this.categoryRepository.findOne(dto.categoryId);

		if (!category) {
			throw new HttpException(`Não há categoria com id: ${dto.categoryId}`, HttpStatus.NOT_FOUND);
		}

		return await this.productRepository.save({ ...dto, category });
	}

	async findAll(isActive: boolean): Promise<ProductEntity[]> {
		const productArr = isActive
			? await this.productRepository.find({ relations: ['category', 'image'], where: { isActive: true } })
			: await this.productRepository.find({ relations: ['category', 'image'] });

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

	async image(id: number, imageBuffer: Buffer, filename: string): Promise<ImageEntity> {
		const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
		const product = await this.productRepository.findOne(id);

		await this.productRepository.update(id, {
			...product,
			image
		});

		return image;
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
