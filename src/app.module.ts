import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './context/product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './context/category/category.module';

@Module({
	imports: [DatabaseModule, ProductModule, CategoryModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
