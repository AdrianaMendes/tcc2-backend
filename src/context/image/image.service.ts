import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>,
		private readonly configService: ConfigService
	) {}

	async uploadPublicFile(dataBuffer: Buffer, filename: string): Promise<ImageEntity> {
		const s3 = new S3();
		const uploadResult = await s3
			.upload({
				Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
				Body: dataBuffer,
				Key: `${uuid()}-${filename}`
			})
			.promise();

		const image = this.imageRepository.create({
			key: uploadResult.Key,
			url: uploadResult.Location
		});

		await this.imageRepository.save(image);
		return image;
	}
}
