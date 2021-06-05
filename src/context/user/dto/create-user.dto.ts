import { Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateAddressDto } from './create-address.dto';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do usuário' })
	@Length(1, 64)
	readonly fullName: string;

	@ApiProperty({ required: false, default: '' })
	readonly image?: string;

	/*
	@ApiProperty({ enum: Object.keys(EUserRole), default: 1, type: 'number' })
	@IsEnum(EUserRole)
	readonly role: EUserRole;
	*/

	@ApiProperty({ required: false })
	readonly address: CreateAddressDto;
}
