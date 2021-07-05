import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';

import { ProductEntity } from '../product/entities/product.entity';
import { UserModule } from '../user/user.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity]), FileModule, UserModule],
	controllers: [CategoryController],
	providers: [CategoryService]
})
export class CategoryModule {}
