import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../context/user/entities/user.entity';
import { UserModule } from '../context/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { RolesGuard } from './guard/roles.guard';

@Module({
	imports: [
		forwardRef(() => UserModule),
		ConfigModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('EXPIRATION_TIME_SESSION'),
				},
			}),
		}),
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard],
	exports: [JwtStrategy, PassportModule],
	controllers: [AuthController],
})
export class AuthModule {}
