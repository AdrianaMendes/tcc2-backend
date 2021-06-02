import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginUserDto } from '../context/user/dto/login-user.dto';
import { UserEntity } from '../context/user/entities/user.entity';
import { IJwtPayload } from '../shared/interface/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		private jwtService: JwtService) { }

	async signIn(dto: LoginUserDto): Promise<{ accessToken: string }> {
		const user = await this.userRepository.findOne({ where: { email: dto.email } });

		if (user && await bcrypt.compare(dto.password, user.password)) {
			const { email } = dto;
			const payload: IJwtPayload = { email };
			const accessToken = this.jwtService.sign(payload);
			return { accessToken };
		}
		else {
			throw new HttpException('Usuário ou senha inválido', HttpStatus.UNAUTHORIZED);
		}
	}
}
