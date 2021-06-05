import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from '../context/user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-in')
	@ApiBody({ type: LoginUserDto })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Senha ou usuário inválido' })
	async singIn(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
		return await this.authService.signIn(dto);
	}
}
