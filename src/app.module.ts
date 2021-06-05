import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';
import { CategoryModule } from './context/category/category.module';
import { OrderProductModule } from './context/order-product/order-product.module';
import { ProductModule } from './context/product/product.module';
import { AddressEntity } from './context/user/entities/address.entity';
import { UserModule } from './context/user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		DatabaseModule,
		ProductModule,
		CategoryModule,
		ConfigModule.forRoot({ validationSchema: configValidationSchema, cache: true }),
		OrderProductModule,
		UserModule,
		AddressEntity,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
