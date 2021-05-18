import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productSevice: ProductService) {
	}

	@Post()
	async create(@Body() obj: ProductEntity): Promise<ProductEntity> {
		return await this.productSevice.create(obj);
	}

	@Get(':id')
	async getById(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.getById(id);
	}

	@Get()
	async getAll(): Promise<ProductEntity[]> {
		return await this.productSevice.getByAll();
	}
}
