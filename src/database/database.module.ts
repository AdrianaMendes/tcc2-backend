import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IEnvironmentVariables } from '../assets/interface/environment-variables.interface';
import { CategoryEntity } from '../components/category/entities/category.entity';
import { FileEntity } from '../components/file/entities/image.entity';
import { OrderProductEntity } from '../components/order/entities/order-product.entity';
import { OrderEntity } from '../components/order/entities/order.entity';
import { ProductEntity } from '../components/product/entities/product.entity';
import { AddressEntity } from '../components/user/entities/address.entity';
import { UserEntity } from '../components/user/entities/user.entity';

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
						FileEntity,
						CategoryEntity,
						ProductEntity,
						OrderProductEntity,
						UserEntity,
						AddressEntity,
						OrderEntity
					],
					synchronize: configService.get('DB_SYNCHRONIZE')
				};

				if (configService.get('DATABASE_URL') !== '') {
					const DB_CLOUD_CONNECTION = {
						url: configService.get('DATABASE_URL'),
						ssl: {
							rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED')
						}
					};
					return { ...DB, ...DB_CLOUD_CONNECTION } as TypeOrmModuleOptions;
				} else {
					return { ...DB } as TypeOrmModuleOptions;
				}
			}
		})
	]
})
export class DatabaseModule {}
