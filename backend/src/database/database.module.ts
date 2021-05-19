import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: '1234',
		database: 'postgres',
		entities: [ProductEntity],
		synchronize: true,
	})]
})
export class DatabaseModule { }
