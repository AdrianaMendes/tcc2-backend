import { DeleteResult, UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../../auth/decorator/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { EUserRole } from '../../shared/enum/user-role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Produto')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiBody({ type: CreateProductDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Produto criado' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
		return await this.productService.create(dto);
	}

	@Get('findAll')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado' })
	async findAll(): Promise<ProductEntity[]> {
		return await this.productService.findAll();
	}

	@Get('findAllActive')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado' })
	@ApiOperation({
		description: 'Endpoint utilizado para listar todos produtos ativos. Usado apenas pelo usuário final.',
	})
	async findAllActive(): Promise<ProductEntity[]> {
		return await this.productService.findAllActive();
	}

	@Get('findOne/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async findOne(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productService.findOne(id);
	}

	@Get('findOneActive/:id')
	@ApiOperation({
		description: 'Endpoint utilizado para consultar apenas produtos ativos. Usado apenas pelo usuário final.',
	})
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async findOneActive(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productService.findOneActive(id);
	}

	@Patch('update/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateProductDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria ou produto não encontrado' })
	async update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<UpdateResult> {
		return await this.productService.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiOperation({ description: 'Endpoint utilizado para efetuar exclusão lógica.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async toggleAvailability(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productService.toggleAvailability(id);
	}

	@Delete('remove/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.productService.remove(id);
	}
}
