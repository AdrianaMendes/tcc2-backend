import { Express } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiExcludeEndpoint,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';

import { ApiFile } from '../../assets/decorator/api-file.decorator';
import { HasRoles } from '../../assets/decorator/has-roles.decorator';
import { EUserRole } from '../../assets/enum/user-role.enum';
import { JwtAuthGuard } from '../../assets/guard/jwt-auth.guard';
import { RolesGuard } from '../../assets/guard/roles.guard';
import { imageFileFilter } from '../../assets/utils';
import { FileEntity } from '../file/entities/image.entity';
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
		return await this.productService.findAll(false);
	}

	@Get('findAllActive')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado' })
	@ApiOperation({
		description: 'Endpoint utilizado para listar todos produtos ativos. Usado apenas pelo usuário final.'
	})
	async findAllActive(): Promise<ProductEntity[]> {
		return await this.productService.findAll(true);
	}

	@Get('findOne/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async findOne(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productService.findOne(id, false);
	}

	@Get('findOneActive/:id')
	@ApiOperation({
		description: 'Endpoint utilizado para consultar apenas produtos ativos. Usado apenas pelo usuário final.'
	})
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado' })
	async findOneActive(@Param('id') id: number): Promise<ProductEntity> {
		return await this.productService.findOne(id, true);
	}

	@Post('image/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiFile('file')
	@UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter, limits: { fileSize: 0.5 * 1024 * 1024 } }))
	async image(@Param('id') id: number, @UploadedFile('file') file: Express.Multer.File): Promise<FileEntity> {
		return await this.productService.image(id, file.buffer, file.originalname);
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
