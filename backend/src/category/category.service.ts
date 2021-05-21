import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

	constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {
	}

	async create(obj: CreateCategoryDto): Promise<CategoryEntity> {
		const result = await this.categoryRepository.save(obj);
		return result;
	}

	async findAll(): Promise<CategoryEntity[]> {
		const result = await this.categoryRepository.find();
		return result;
	}

	async findOne(id: number): Promise<CategoryEntity> {
		const result = await this.categoryRepository.findOne(id);
		return result;
	}

	async update(id: number, obj: UpdateCategoryDto): Promise<UpdateResult> {
		const newObj = {id, ...obj};
		const result = await this.categoryRepository.update(newObj.id, newObj);
		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		const result = await this.categoryRepository.delete(id);
		return result;
	}
}
