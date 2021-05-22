import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

	@ApiProperty({ description: 'Id da categoria' })
	readonly categoryId: number;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do produto' })
	readonly name: string;

	@ApiProperty({ minLength: 1, maxLength: 128, required: false, default: '' })
	readonly description?: string;

	@ApiProperty({ required: false, default: '' })
	readonly image?: string;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 0, maximum: 9999, default: 0 })
	readonly amount: number;

	@ApiProperty({ type: 'number', format: 'float', minimum: 0.01, maximum: 9999.99, default: 0 })
	readonly value: number;
}
