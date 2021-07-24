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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../assets/decorator/api-file.decorator';
import { HasRoles } from '../../assets/decorator/has-roles.decorator';
import { EUserRole } from '../../assets/enum/user-role.enum';
import { JwtAuthGuard } from '../../assets/guard/jwt-auth.guard';
import { RolesGuard } from '../../assets/guard/roles.guard';
import { imageFileFilter } from '../../assets/utils';
import { FileEntity } from '../file/entities/image.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('Categoria')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('create')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiBody({ type: CreateCategoryDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Categoria criado' })
	async create(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
		return await this.categoryService.create(dto);
	}

	@Get('findAll')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há categoria cadastrada' })
	async findAll(): Promise<CategoryEntity[]> {
		return await this.categoryService.findAll();
	}

	@Get('findOne/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	async findOne(@Param('id') id: number): Promise<CategoryEntity> {
		return await this.categoryService.findOne(id);
	}

	@Post('image/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiFile('file')
	@UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter, limits: { fileSize: 0.5 * 1024 * 1024 } }))
	async image(@Param('id') id: number, @UploadedFile('file') file: Express.Multer.File): Promise<FileEntity> {
		return await this.categoryService.image(id, file.buffer, file.originalname);
	}

	@Get('findAllProduct/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado com a categoria' })
	async findAllProduct(@Param('id') id: number): Promise<ProductEntity[]> {
		return await this.categoryService.findAllProduct(id, false);
	}

	@Get('findAllProductActive/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há produto cadastrado com a categoria' })
	async findAllProductActive(@Param('id') id: number): Promise<ProductEntity[]> {
		return await this.categoryService.findAllProduct(id, true);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateCategoryDto })
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto): Promise<UpdateResult> {
		return await this.categoryService.update(id, dto);
	}

	@Delete('remove/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.categoryService.remove(id);
	}
}
