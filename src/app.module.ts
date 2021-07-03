import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';
import { CategoryModule } from './context/category/category.module';
import { OrderModule } from './context/order/order.module';
import { ProductModule } from './context/product/product.module';
import { AddressEntity } from './context/user/entities/address.entity';
import { UserModule } from './context/user/user.module';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './context/dashboard/dashboard.module';
import { ImageModule } from './context/image/image.module';

@Module({
	imports: [
		DatabaseModule,
		ProductModule,
		CategoryModule,
		ConfigModule.forRoot({ validationSchema: configValidationSchema, cache: true }),
		UserModule,
		AddressEntity,
		AuthModule,
		OrderModule,
		DashboardModule,
		ImageModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
