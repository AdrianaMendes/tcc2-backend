import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export class CreateProductDto {

	@ApiProperty()
	category: CreateCategoryDto;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do produto' })
	name: string;

	@ApiProperty({ minLength: 1, maxLength: 128, required: false, default: '' })
	description?: string;

	@ApiProperty({ required: false, default: '' })
	image?: string;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 0, maximum: 9999, default: 0 })
	amount: number;

	@ApiProperty({ type: 'number', format: 'float', minimum: 0.01, maximum: 9999.99, default: 0 })
	value: number;
}
