import { IsEmail, IsNotEmpty, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do usuário' })
	@Length(1, 64)
	readonly fullName: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'teste@email.com' })
	@IsEmail()
	readonly email: string;

	@ApiProperty({ default: 'senha' })
	@IsNotEmpty()
	password: string;

	@ApiProperty({ required: false })
	readonly address: CreateAddressDto;
}
