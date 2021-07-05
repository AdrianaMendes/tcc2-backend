import { IsPositive, Max } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderProductDto {
	@ApiProperty({ description: 'Id do produto', default: '1' })
	@IsPositive()
	readonly productId: number;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 1, maximum: 9999, default: 1 })
	@IsPositive()
	@Max(9999)
	readonly amount: number;

	originalProductValue: number;
}
