import { PickType } from '@nestjs/swagger';
import { UpdateOrderProductDto } from './update-order-product.dto';

export class UpdateOrderProductAmountDto extends PickType(UpdateOrderProductDto, ['amount'] as const) { }
