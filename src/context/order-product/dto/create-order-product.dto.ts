import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, Max } from 'class-validator';

export class CreateOrderProductDto {

	/* TODO Habilitar o relacionamento do Order
	order: Order;
	*/

	@ApiProperty({ description: 'Id do produto' })
	@IsPositive()
	readonly productId: number;

	@ApiProperty({ type: 'integer', format: 'int32', minimum: 1, maximum: 9999, default: 0 })
	@IsPositive()
	@Max(9999)
	readonly amount: number;

	originalProductValue: number;
}
