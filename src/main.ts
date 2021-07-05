import { config as configAWS } from 'aws-sdk';
import * as basicAuth from 'express-basic-auth';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { IEnvironmentVariables } from './assets/interface/environment-variables.interface';

async function bootstrap(): Promise<void> {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService<IEnvironmentVariables> = app.get(ConfigService);
	app.use(
		['/api', '/api-json'],
		basicAuth({
			challenge: true,
			users: { [configService.get('SWAGGER_USERNAME')]: configService.get('SWAGGER_PASSWORD') }
		})
	);
	const config = new DocumentBuilder().setTitle('Backend APP').setVersion('1.0').addBearerAuth().build();
	const options: SwaggerDocumentOptions = {};
	const document = SwaggerModule.createDocument(app, config, options);
	const customOptions: SwaggerCustomOptions = {
		swaggerOptions: {
			filter: true,
			showRequestDuration: true,
			docExpansion: 'none',
			tagsSorter: 'alpha'
		}
	};
	SwaggerModule.setup('api', app, document, customOptions);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	configAWS.update({
		accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
		secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
		region: configService.get('AWS_REGION')
	});

	await app.listen(configService.get('PORT'));
	logger.log('Backend inicializado');
}

bootstrap();
