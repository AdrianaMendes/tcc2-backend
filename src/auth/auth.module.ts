import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../context/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({ secret: 'SEGREDO', signOptions: { expiresIn: 3600 } }),
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
	controllers: [AuthController]
})
export class AuthModule { }
