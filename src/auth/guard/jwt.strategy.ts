import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../context/user/entities/user.entity';
import { IEnvironmentVariables } from '../../shared/interface/environment-variables.interface';
import { IJwtPayload } from '../../shared/interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		private configService: ConfigService<IEnvironmentVariables>
	) {
		super({
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}

	async validate(payload: IJwtPayload): Promise<UserEntity> {
		const { email } = payload;
		const user = await this.userRepository.findOne({ email });

		if (!user) {
			throw new HttpException('Falha na autenticação', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
