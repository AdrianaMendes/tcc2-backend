import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { ProductEntity } from 'src/context/product/entities/product.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: '1234',
		database: 'postgres',
		entities: [CategoryEntity, ProductEntity],
		synchronize: true,
	})]
})
export class DatabaseModule { }
