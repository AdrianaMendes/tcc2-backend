import { IsNotEmpty, Length, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IFile } from '../../../assets/interface/file.interface';

export class CreateCategoryDto {
	@ApiProperty({ minLength: 1, maxLength: 64, default: 'Nome da categoria' })
	@IsNotEmpty()
	@Length(1, 64)
	readonly name: string;

	@ApiProperty({ minLength: 0, maxLength: 128, required: false, default: '' })
	@MaxLength(128)
	readonly description?: string;

	@ApiProperty()
	image?: IFile;
}
