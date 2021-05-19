import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([ProductEntity])]
})
export class ProductModule { }
