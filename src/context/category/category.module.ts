import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity]), AuthModule],
	controllers: [CategoryController],
	providers: [CategoryService]
})
export class CategoryModule { }
