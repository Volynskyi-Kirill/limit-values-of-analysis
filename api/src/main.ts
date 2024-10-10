import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3001;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  console.log(`server running on port ${PORT}`);
}
bootstrap();
