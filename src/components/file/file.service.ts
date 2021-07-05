import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { FileEntity } from './entities/image.entity';

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>,
		private readonly configService: ConfigService
	) {}

	async uploadFile(dataBuffer: Buffer, filename: string): Promise<FileEntity> {
		const s3 = new S3();
		const uploadResult = await s3
			.upload({
				Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
				Body: dataBuffer,
				Key: `${uuid()}-${filename}`
			})
			.promise();

		const image = this.fileRepository.create({
			key: uploadResult.Key,
			url: uploadResult.Location
		});

		await this.fileRepository.save(image);
		return image;
	}

	async removeFile(id: number): Promise<void> {
		const file = await this.fileRepository.findOne({ id: id });
		const s3 = new S3();
		await s3
			.deleteObject({
				Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
				Key: file.key
			})
			.promise();
		await this.fileRepository.delete(id);
	}
}
