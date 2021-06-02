import { CategoryEntity } from 'src/context/category/entities/category.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity]), AuthModule]
})
export class ProductModule { }
