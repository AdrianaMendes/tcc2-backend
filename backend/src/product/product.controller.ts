import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {

	constructor(private readonly productSevice: ProductService) { }

	@Post('create/')
	@ApiBody({ type: CreateProductDto })
	async create(@Body() obj: CreateProductDto): Promise<ProductEntity> {
		return await this.productSevice.create(obj);
	}

	@Get('findAll')
	async findAll(): Promise<ProductEntity[]> {
		return await this.productSevice.findAll();
	}

	@Get('findOne/:id')
	async findOne(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.findOne(id);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateProductDto })
	async update(@Param('id') id: number, @Body() obj: UpdateProductDto): Promise<UpdateResult> {
		return await this.productSevice.update(id, obj);
	}

	@Patch('toggleAvailability/:id')
	async toggleAvailability(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.toggleAvailability(id);
	}

	@Delete('remove/:id')
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.productSevice.remove(id);
	}
}
