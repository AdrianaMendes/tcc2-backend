import { IsEnum, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EOrderStatus } from '../../../shared/enum/order-status.enum';
import { EPaymentType } from '../../../shared/enum/payment-type.enum';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
	@ApiProperty({ description: 'Id do usuário', default: 1 })
	@IsPositive()
	userId: number;

	@ApiProperty({ type: [CreateOrderItemDto], required: false })
	readonly orderProductArr?: CreateOrderItemDto[];

	@ApiProperty({ enum: Object.keys(EPaymentType), default: EPaymentType.CASH, type: 'number' })
	@IsEnum(EPaymentType)
	readonly paymentType: EPaymentType;

	@ApiProperty({ enum: Object.keys(EOrderStatus), default: EOrderStatus.OPEN, type: 'number' })
	@IsEnum(EOrderStatus)
	readonly status: EOrderStatus;

	totalValue = 0;
}
