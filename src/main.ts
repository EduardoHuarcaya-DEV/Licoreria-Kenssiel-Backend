import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para las rutas
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configurar Swagger
  const options = new DocumentBuilder()
    .setTitle('Kenssiel API') // Título de tu API
    .setDescription('Backend para la gestión de productos en Kenssiel') // Descripción de tu API
    .setVersion('1.0') // Versión de tu API
    .addTag('tags') // Puedes añadir etiquetas para clasificar tus endpoints
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document); // Servir la documentación en /api/v1

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
