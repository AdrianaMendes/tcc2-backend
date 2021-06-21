import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginUserDto } from '../context/user/dto/login-user.dto';
import { UserEntity } from '../context/user/entities/user.entity';
import { IJwtPayload } from '../shared/interface/jwt-payload.interface';
import { IUserCredentials } from '../shared/interface/user-credentials.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		private jwtService: JwtService
	) {}

	async signIn(dto: LoginUserDto): Promise<IUserCredentials> {
		const user = await this.userRepository.findOne({ where: { email: dto.email } });

		if (user && (await bcrypt.compare(dto.password, user.password))) {
			const { email, role } = user;
			const payload: IJwtPayload = { email, role };

			const response: IUserCredentials = {
				fullName: user.fullName,
				email: user.email,
				image: user.image,
				role: user.role,
				accessToken: this.jwtService.sign(payload)
			};

			return response;
		} else {
			throw new HttpException('Usuário ou senha inválido', HttpStatus.UNAUTHORIZED);
		}
	}

	async getOnlineUser(user: UserEntity): Promise<IUserCredentials> {
		const { email, role } = user;
		const payload: IJwtPayload = { email, role };

		const response: IUserCredentials = {
			fullName: user.fullName,
			email: user.email,
			image: user.image,
			role: user.role,
			accessToken: this.jwtService.sign(payload)
		};

		return response;
	}
}
