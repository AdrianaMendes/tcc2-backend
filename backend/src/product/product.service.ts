import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {

	constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {
	}

	async create(obj: ProductDto): Promise<ProductEntity> {
		const result = await this.productRepository.save(obj);
		return result;
	}

	async getById(id: number): Promise<ProductEntity> {
		const result = await this.productRepository.findOne(id);
		return result;
	}

	async getByAll(): Promise<ProductEntity[]> {
		const result = await this.productRepository.find();
		return result;
	}

}
