import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length, Max, MaxLength, Min } from 'class-validator';

export class CreateProductDto {

	@ApiProperty({ description: 'Id da categoria' })
	@IsPositive()
	readonly categoryId: number;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do produto' })
	@IsNotEmpty()
	@Length(1, 64)
	readonly name: string;

	@ApiProperty({ minLength: 0, maxLength: 128, required: false, default: '' })
	@MaxLength(128)
	readonly description?: string;

	@ApiProperty({ required: false, default: '' })
	readonly image?: string;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 1, maximum: 9999, default: 0 })
	@IsPositive()
	@Max(9999)
	readonly amount: number;

	@ApiProperty({ type: 'number', format: 'float', minimum: 0.01, maximum: 9999.99, default: 0 })
	@Min(0.01)
	@Max(9999.99)
	readonly value: number;
}
