import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateCategoryDto {

	@ApiProperty({ required: false })
	productArr: CreateProductDto[];

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome da categoria' })
	name: string;

	@ApiProperty({ minLength: 1, maxLength: 128, required: false, default: '' })
	description?: string;

	@ApiProperty({ required: false, default: '' })
	image?: string;
}
