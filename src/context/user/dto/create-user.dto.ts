import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Length } from 'class-validator';
import { EUserRole } from '../../../shared/enum/user-role.enum';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome do usuário' })
	@Length(1, 64)
	readonly fullName: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'teste@email.com' })
	@IsEmail()
	readonly email: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'senha' })
	@Length(1, 64)
	readonly password: string;

	@ApiProperty({ required: false, default: '' })
	readonly image?: string;

	@ApiProperty({ enum: EUserRole, default: EUserRole.USER })
	@IsEnum(EUserRole)
	readonly role: EUserRole;

	@ApiProperty({ required: false })
	readonly address: CreateAddressDto;
}
