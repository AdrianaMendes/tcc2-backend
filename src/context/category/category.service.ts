import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

	constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {
	}

	async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
		const result = await this.categoryRepository.save(dto);
		return result;
	}

	async findAll(): Promise<CategoryEntity[]> {
		const entityArr = await this.categoryRepository.find();

		if (entityArr.length === 0) {
			throw new HttpException('Não há categoria cadastrada', HttpStatus.NO_CONTENT);
		}

		return entityArr;
	}

	async findOne(id: number): Promise<CategoryEntity> {
		const result = await this.categoryRepository.findOne(id);

		if (!result) {
			throw new HttpException(`Não há categoria com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async update(id: number, dto: UpdateCategoryDto): Promise<UpdateResult> {
		const { name, description, image } = dto;
		const updateEntity = new CategoryEntity(name, description, image);
		const result = await this.categoryRepository.update(id, updateEntity);

		if (result.affected === 0) {
			throw new HttpException(`Não há categoria com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async remove(id: number): Promise<DeleteResult> {
		const result = await this.categoryRepository.delete(id);
		return result;
	}
}
