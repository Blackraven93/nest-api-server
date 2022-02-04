import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //* Class Validation 적용! (birds.schema.ts)
  app.useGlobalFilters(new HttpExceptionFilter());
  const { PORT } = process.env;
  await app.listen(PORT);
}
bootstrap();
