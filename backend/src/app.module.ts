import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './entity/product/product.module';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'root',
		database: 'test',
		entities: [],
		synchronize: true,
	}), ProductModule, ],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
