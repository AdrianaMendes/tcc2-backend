import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('Categoria')
@UsePipes(new ValidationPipe())
export class CategoryController {

	constructor(private readonly categoryService: CategoryService) { }

	@Post('/create')
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

	@Patch('update/:id')
	@ApiBody({ type: UpdateCategoryDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoria não encontrada' })
	async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto): Promise<UpdateResult> {
		return await this.categoryService.update(id, dto);
	}

	@Delete('remove/:id')
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.categoryService.remove(id);
	}
}
