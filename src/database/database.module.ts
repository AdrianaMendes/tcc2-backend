import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { ProductEntity } from 'src/context/product/entities/product.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'ec2-107-20-153-39.compute-1.amazonaws.com',
		port: 5432,
		username: 'tcdilzxvoubeig',
		password: '018745603a072ea59bcab07c6a151b3446d6e491ed6e236e9b8c3220c348ec12',
		database: 'd7a3gqae13ofs',
		url: 'postgres://tcdilzxvoubeig:018745603a072ea59bcab07c6a151b3446d6e491ed6e236e9b8c3220c348ec12@ec2-107-20-153-39.compute-1.amazonaws.com:5432/d7a3gqae13ofs',
		entities: [CategoryEntity, ProductEntity],
		synchronize: true,
		ssl: {
			rejectUnauthorized: false,
		}
	})]
})
export class DatabaseModule { }
