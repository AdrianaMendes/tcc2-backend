import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

	constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {
	}

	async create(obj: CreateProductDto): Promise<ProductEntity> {
		const result = await this.productRepository.save(obj);
		return result;
	}

	async findAll(): Promise<ProductEntity[]> {
		const result = await this.productRepository.find();
		return result;
	}

	async findOne(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id);
		return result;
	}

	async update(id: number, obj: UpdateProductDto): Promise<UpdateResult> {
		const newObj = {id, ...obj};
		const result = await this.productRepository.update(newObj.id, newObj);
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
