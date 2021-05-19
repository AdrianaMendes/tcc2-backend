import { ProductDto } from '../../product/dto/product.dto';

export class CategoryDto {
	productDtoArr: ProductDto[];
	name: string;
	description: string;
	image: string;
}
