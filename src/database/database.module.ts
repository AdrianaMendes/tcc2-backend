import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { ProductEntity } from 'src/context/product/entities/product.entity';
import * as dotenv from 'dotenv';
import { OrderProductEntity } from '../context/order-product/entities/order-product.entity';
import { UserEntity } from '../context/user/entities/user.entity';

// TODO Melhorar o import do .ENV

dotenv.config();

let objDatabaseCloud = null;

if (process.env.DATABASE_URL) {
	objDatabaseCloud = {
		url: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		}
	};
}

const objEnv = {
	type: 'postgres',
	host: process.env.DATABASE_HOST || 'localhost',
	port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
	username: process.env.DATABASE_USER || 'postgres',
	password: process.env.DATABASE_PASSWORD || '1234',
	database: process.env.DATABASE || 'postgres',
	entities: [CategoryEntity, ProductEntity, OrderProductEntity, UserEntity],
	synchronize: true,
};

@Module({
	imports: [TypeOrmModule.forRoot({ ...objEnv, ...objDatabaseCloud })]
})
export class DatabaseModule { }
