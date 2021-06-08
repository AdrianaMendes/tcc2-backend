import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CategoryEntity } from '../context/category/entities/category.entity';
import { OrderProductEntity } from '../context/order-product/entities/order-product.entity';
import { OrderEntity } from '../context/order/entities/order.entity';
import { ProductEntity } from '../context/product/entities/product.entity';
import { AddressEntity } from '../context/user/entities/address.entity';
import { UserEntity } from '../context/user/entities/user.entity';
import { IEnvironmentVariables } from '../shared/interface/environment-variables.interface';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService<IEnvironmentVariables>) => {
				const DB = {
					type: 'postgres',
					host: configService.get('DB_HOST'),
					port: configService.get('DB_PORT'),
					database: configService.get('DB_NAME'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					entities: [
						CategoryEntity,
						ProductEntity,
						OrderProductEntity,
						UserEntity,
						AddressEntity,
						OrderEntity,
					],
					synchronize: configService.get('DB_SYNCHRONIZE'),
				};

				if (configService.get('DATABASE_URL') !== '') {
					const DB_CLOUD_CONNECTION = {
						url: configService.get('DATABASE_URL'),
						ssl: {
							rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED'),
						},
					};
					return { ...DB, ...DB_CLOUD_CONNECTION } as TypeOrmModuleOptions;
				} else {
					return { ...DB } as TypeOrmModuleOptions;
				}
			},
		}),
	],
})
export class DatabaseModule {}
