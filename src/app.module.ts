import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { CategoryModule } from './components/category/category.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { FileModule } from './components/file/file.module';
import { OrderModule } from './components/order/order.module';
import { ProductModule } from './components/product/product.module';
import { AddressEntity } from './components/user/entities/address.entity';
import { UserModule } from './components/user/user.module';
import { configValidationSchema } from './config/config.schema';
import { DatabaseModule } from './database/database.module';

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
		FileModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
