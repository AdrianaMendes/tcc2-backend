import { CategoryEntity } from 'src/context/category/entities/category.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressEntity } from '../user/entities/address.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService, UserService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity, UserEntity, AddressEntity])]
})
export class ProductModule {}
