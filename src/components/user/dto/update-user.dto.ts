import { Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateAddressDto } from './create-address.dto';

export class UpdateUserDto {
	id?: number;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do usuário', required: false })
	@Length(1, 64)
	readonly fullName?: string;

	@ApiProperty({ required: false })
	readonly address?: CreateAddressDto;
}
