import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome da categoria' })
	readonly name: string;

	@ApiProperty({ minLength: 1, maxLength: 128, required: false, default: '' })
	readonly description?: string;

	@ApiProperty({ required: false, default: '' })
	readonly image?: string;
}
