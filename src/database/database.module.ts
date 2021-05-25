import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { ProductEntity } from 'src/context/product/entities/product.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
		username: process.env.DATABASE_USER || 'postgres',
		password: process.env.DATABASE_PASSWORD || '1234',
		database: process.env.DATABASE || 'postgres',
		entities: [CategoryEntity, ProductEntity],
		synchronize: true,
		ssl: {
			rejectUnauthorized: false,
		}
	})]
})
export class DatabaseModule { }
