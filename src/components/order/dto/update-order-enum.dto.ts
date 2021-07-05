import { IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EOrderStatus } from '../../../assets/enum/order-status.enum';
import { EPaymentType } from '../../../assets/enum/payment-type.enum';

export class UpdateOrderEnumDto {
	@ApiProperty({ description: 'Id do pedido' })
	readonly id: number;

	@ApiProperty({ enum: Object.keys(EOrderStatus), type: 'number', required: false })
	@IsEnum(EOrderStatus)
	readonly status?: EOrderStatus;

	@ApiProperty({ enum: Object.keys(EPaymentType), type: 'number', required: false })
	@IsEnum(EPaymentType)
	readonly paymentType?: EPaymentType;
}
