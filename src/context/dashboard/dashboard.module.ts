import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/entities/order.entity';

import { ProductEntity } from '../product/entities/product.entity';
import { AddressEntity } from '../user/entities/address.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
	controllers: [DashboardController],
	providers: [DashboardService, UserService],
	imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity, AddressEntity, OrderEntity])]
})
export class DashboardModule {}
