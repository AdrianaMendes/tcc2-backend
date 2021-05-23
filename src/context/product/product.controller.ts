import { Controller, Post, Get, Param, Body, Patch, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Produto')
@UsePipes(new ValidationPipe())
export class ProductController {

	constructor(private readonly productSevice: ProductService) { }

	@Post('create/')
	@ApiBody({ type: CreateProductDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Produto criado' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
		return await this.productSevice.create(dto);
	}

	@Get('findAll')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado' })
	async findAll(): Promise<ProductEntity[]> {
		return await this.productSevice.findAll();
	}

	@Get('findOne/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async findOne(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.findOne(id);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateProductDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria ou produto não encontrado' })
	async update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<UpdateResult> {
		return await this.productSevice.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@ApiOperation({ description: 'Endpoint utilizado para efetuar exclusão lógica' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async toggleAvailability(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productSevice.toggleAvailability(id);
	}

	@Delete('remove/:id')
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.productSevice.remove(id);
	}
}
