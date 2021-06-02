import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderProductEntity } from './entities/order-product.entity';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';

@Module({
	controllers: [OrderProductController],
	providers: [OrderProductService],
	imports: [TypeOrmModule.forFeature([OrderProductEntity, ProductEntity]), AuthModule]
})
export class OrderProductModule { }
