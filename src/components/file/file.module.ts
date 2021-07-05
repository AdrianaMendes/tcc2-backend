import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileEntity } from './entities/image.entity';
import { FileService } from './file.service';

@Module({
	imports: [TypeOrmModule.forFeature([FileEntity]), ConfigModule],
	providers: [FileService],
	exports: [FileService]
})
export class FileModule {}
