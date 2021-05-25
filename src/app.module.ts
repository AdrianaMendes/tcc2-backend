import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './context/product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './context/category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [DatabaseModule, ProductModule, CategoryModule, ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
