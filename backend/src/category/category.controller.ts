import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('Categoria')
export class CategoryController {

	constructor(private readonly categoryService: CategoryService) { }

	@Post('/create')
	@ApiBody({ type: CreateCategoryDto })
	@ApiResponse({ status: 201, description: 'Categoria criado'})
	async create(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
		return await this.categoryService.create(dto);
	}

	@Get('findAll')
	async findAll(): Promise<CategoryEntity[]> {
		return await this.categoryService.findAll();
	}

	@Get('findOne/:id')
	async findOne(@Param('id') id: number): Promise<CategoryEntity> {
		return await this.categoryService.findOne(id);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateCategoryDto })
	async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto): Promise<UpdateResult> {
		return await this.categoryService.update(id, dto);
	}

	@Delete('remove/:id')
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.categoryService.remove(id);
	}
}
