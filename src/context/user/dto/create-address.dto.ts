import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
	@ApiProperty({ default: '00000000' })
	cep: string;

	@ApiProperty({ default: 'MG' })
	state: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'cidade' })
	city: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'bairro' })
	district: string;

	@ApiProperty({ minLength: 1, maxLength: 64, default: 'rua' })
	street: string;

	@ApiProperty({ default: 0 })
	number: number;

	@ApiProperty({ maxLength: 128, required: false, default: '' })
	complement?: string;
}
