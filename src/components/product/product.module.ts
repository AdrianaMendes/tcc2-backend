import { CategoryEntity } from 'src/components/category/entities/category.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity]), FileModule, UserModule]
})
export class ProductModule {}
