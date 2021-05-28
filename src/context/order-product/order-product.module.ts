import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
	controllers: [OrderProductController],
	providers: [OrderProductService],
	imports: [TypeOrmModule.forFeature([OrderProductEntity, ProductEntity])]
})
export class OrderProductModule { }
