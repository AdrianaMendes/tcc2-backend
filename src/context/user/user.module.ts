import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		TypeOrmModule.forFeature([UserEntity, AddressEntity]), AuthModule
	],
})
export class UserModule { }
