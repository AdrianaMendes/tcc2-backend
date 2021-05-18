import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {

	constructor (@InjectRepository(ProductEntity) private userRepository: Repository<ProductEntity>) {
	}

	async create(obj: ProductEntity): Promise<ProductEntity> {
		const result = await this.userRepository.save(obj);
		return result;
	}

	async getById(id: number): Promise<ProductEntity> {
		const result = await this.userRepository.findOne(id);
		return result;
	}

	async getByAll(): Promise<ProductEntity[]> {
		const result = await this.userRepository.find();
		return result;
	}

}
