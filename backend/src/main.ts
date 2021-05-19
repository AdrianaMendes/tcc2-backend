import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Backend APP Super Delivery')
		.setDescription('Backend APP Super Delivery')
		.setVersion('1.0')
		.addTag('app')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

bootstrap();
