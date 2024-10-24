import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const CorsConfig = {
  origin: ['http://localhost:3000'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3001;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(CorsConfig);

  await app.listen(PORT);

  console.log(`server running on port ${PORT}`);
}
bootstrap();
