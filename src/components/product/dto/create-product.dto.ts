import { IsPositive, Length, Max, MaxLength, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IFile } from '../../../assets/interface/file.interface';

export class CreateProductDto {
	@ApiProperty({ description: 'Id da categoria' })
	@IsPositive()
	categoryId: number;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do produto' })
	@Length(1, 64)
	readonly name: string;

	@ApiProperty({ minLength: 0, maxLength: 128, required: false, default: '' })
	@MaxLength(128)
	readonly description?: string;

	@ApiProperty()
	image?: IFile;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 1, maximum: 9999, default: 0 })
	@IsPositive()
	@Max(9999)
	readonly amount: number;

	@ApiProperty({ type: 'number', format: 'float', minimum: 0.01, maximum: 9999.99, default: 0 })
	@Min(0.01)
	@Max(9999.99)
	readonly value: number;
}
