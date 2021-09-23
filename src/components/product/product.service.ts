import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/components/category/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FileEntity } from '../file/entities/image.entity';
import { FileService } from '../file/file.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
		@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
		private fileService: FileService
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
			? await this.productRepository.find({ relations: ['category', 'image'], where: { isActive: true } })
			: await this.productRepository.find({ relations: ['category', 'image'] });

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async findMostRecent(): Promise<ProductEntity[]> {
		const productArr = await this.productRepository.find({
			relations: ['category', 'image'],
			where: { isActive: true },
			take: 5,
			order: { id: 'DESC' }
		});

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async findMostInStock(): Promise<ProductEntity[]> {
		const productArr = await this.productRepository.find({
			relations: ['category', 'image'],
			where: { isActive: true },
			take: 5,
			order: { amount: 'DESC' }
		});

		if (productArr.length === 0) {
			throw new HttpException('Não há produto cadastrado', HttpStatus.NO_CONTENT);
		}

		return productArr;
	}

	async searchProduct(categoryId: number, productName: string): Promise<ProductEntity[]> {
		let productArr: ProductEntity[] = [];

		if (!isNaN(categoryId) && productName != 'undefined') {
			productArr = await this.productRepository.find({
				relations: ['category', 'image'],
				where: { isActive: true, name: productName, category: { id: categoryId } }
			});
		} else if (!isNaN(categoryId)) {
			productArr = await this.productRepository.find({
				relations: ['category', 'image'],
				where: { isActive: true, category: { id: categoryId } }
			});
		} else if (productName != 'undefined') {
			productArr = await this.productRepository.find({
				relations: ['category', 'image'],
				where: { isActive: true, name: productName }
			});
		}

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

	async image(id: number, imageBuffer: Buffer, filename: string): Promise<FileEntity> {
		const product = await this.productRepository.findOne(id, { relations: ['image'] });

		if (product.image) {
			await this.productRepository.update(id, { image: null });
			await this.fileService.removeFile(product.image.id);
		}

		const image = await this.fileService.uploadFile(imageBuffer, filename);

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
