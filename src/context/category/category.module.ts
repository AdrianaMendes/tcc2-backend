import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '../product/entities/product.entity';
import { AddressEntity } from '../user/entities/address.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity, UserEntity, AddressEntity])],
	controllers: [CategoryController],
	providers: [CategoryService, UserService]
})
export class CategoryModule {}
