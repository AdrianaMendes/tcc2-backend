import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Produto')
export class ProductController {

	constructor(private readonly productSevice: ProductService) { }

	@Post('create/')
	@ApiBody({ type: CreateProductDto })
	async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
		return await this.productSevice.create(dto);
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
	async update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<UpdateResult> {
		return await this.productSevice.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@ApiOperation({description: 'Endpoint utilizado para efetuar exclusão lógica.'})
	async toggleAvailability(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.toggleAvailability(id);
	}

	@Delete('remove/:id')
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.productSevice.remove(id);
	}
}
