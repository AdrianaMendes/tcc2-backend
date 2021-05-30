import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Backend APP')
		.setVersion('1.0')
		.build();

	const options: SwaggerDocumentOptions = {
	};

	const document = SwaggerModule.createDocument(app, config, options);

	const customOptions: SwaggerCustomOptions = {
		swaggerOptions: {
			filter: true,
			showRequestDuration: true,
			docExpansion: 'none'
		}
	};

	SwaggerModule.setup('api', app, document, customOptions);

	await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
