import { ApiProperty } from '@nestjs/swagger';

import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
	@ApiProperty({ type: [CreateOrderProductDto], required: false })
	orderProductDtoArr?: CreateOrderProductDto[];
}
