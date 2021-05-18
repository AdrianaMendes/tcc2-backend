import { CategoryDto } from '../../category/dto/create-category.dto';

export class ProductDto {
	categoryDto: CategoryDto;
	name: string;
	description: string;
	image: string;
	value: number;
}
