import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	description?: string;

	@ApiProperty()
	image?: string;

	@ApiProperty()
	amount: number;

	@ApiProperty()
	isActive: boolean;

	@ApiProperty()
	value: number;
}
