import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './context/product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './context/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { OrderProductModule } from './context/order-product/order-product.module';
import { UserModule } from './context/user/user.module';
import { AddressEntity } from './context/user/entities/address.entity';

@Module({
	imports: [DatabaseModule, ProductModule, CategoryModule, ConfigModule.forRoot({ isGlobal: true }), OrderProductModule, UserModule, AddressEntity],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
