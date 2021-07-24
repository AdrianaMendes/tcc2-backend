import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../assets/decorator/get-user.decorator';
import { JwtAuthGuard } from '../../assets/guard/jwt-auth.guard';
import { IUserCredentials } from '../../assets/interface/user-credentials.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

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
