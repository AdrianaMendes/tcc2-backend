import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from '../context/user/dto/login-user.dto';
import { UserEntity } from '../context/user/entities/user.entity';
import { IUserCredentials } from '../shared/interface/user-credentials.interface';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-in')
	@ApiBody({ type: LoginUserDto })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Senha ou usuário inválido' })
	async singIn(@Body() dto: LoginUserDto): Promise<IUserCredentials> {
		return await this.authService.signIn(dto);
	}

	@Get('get-online-user')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async getUser(@GetUser() user: UserEntity): Promise<IUserCredentials> {
		return await this.authService.getOnlineUser(user);
	}
}
