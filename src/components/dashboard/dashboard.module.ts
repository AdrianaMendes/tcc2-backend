import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '../order/entities/order.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
	controllers: [DashboardController],
	providers: [DashboardService],
	imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity]), UserModule]
})
export class DashboardModule {}
