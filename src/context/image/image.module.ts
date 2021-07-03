import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';

@Module({
	imports: [TypeOrmModule.forFeature([ImageEntity]), ConfigModule],
	providers: [ImageService]
})
export class ImageModule {}
