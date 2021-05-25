import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Backend APP')
		.setDescription('Backend APP')
		.setVersion('1.0')
		.build();

	const options: SwaggerDocumentOptions = {
	};

	const document = SwaggerModule.createDocument(app, config, options);

	const customOptions: SwaggerCustomOptions = {
		swaggerOptions: {
			filter: true,
			showRequestDuration: true
		}
	};

	SwaggerModule.setup('api', app, document, customOptions);

	const PORT: number = Number(process.env.PORT) || 3000;

	await app.listen(PORT);
}

bootstrap();
