import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
	@ApiProperty({ minLength: 1, maxLength: 64, default: 'teste@email.com' })
	@IsEmail({}, { message: 'E-mail inválido' })
	readonly email: string;

	@ApiProperty({ default: 'senha' })
	@IsNotEmpty({ message: 'Senha inválido' })
	password: string;
}
