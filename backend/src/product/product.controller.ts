import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productSevice: ProductService) {
	}

	@Post()
	@ApiBody({ type: ProductDto })
	async create(@Body() obj: ProductDto): Promise<ProductEntity> {
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
