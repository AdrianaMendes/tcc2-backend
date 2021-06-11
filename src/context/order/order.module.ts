import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '../product/entities/product.entity';
import { AddressEntity } from '../user/entities/address.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { OrderProductEntity } from './entities/order-product.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, UserService],
	imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, AddressEntity, OrderProductEntity, ProductEntity])]
})
export class OrderModule {}
