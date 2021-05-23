import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { CategoryEntity } from 'src/context/category/entities/category.entity';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])]
})
export class ProductModule { }
