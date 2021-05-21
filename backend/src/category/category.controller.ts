import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {

	constructor(private readonly categoryService: CategoryService) { }

	@Post('/create')
	@ApiBody({ type: CreateCategoryDto })
	async create(@Body() obj: CreateCategoryDto): Promise<CategoryEntity> {
		return await this.categoryService.create(obj);
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
	async update(@Param('id') id: number, @Body() obj: UpdateCategoryDto): Promise<UpdateResult> {
		return await this.categoryService.update(id, obj);
	}

	@Delete('remove/:id')
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.categoryService.remove(id);
	}
}
