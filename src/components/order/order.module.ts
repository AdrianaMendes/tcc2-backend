import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '../product/entities/product.entity';
import { UserModule } from '../user/user.module';
import { OrderProductEntity } from './entities/order-product.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [TypeOrmModule.forFeature([OrderEntity, OrderProductEntity, ProductEntity]), UserModule]
})
export class OrderModule {}
