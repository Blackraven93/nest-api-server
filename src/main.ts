import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 제네릭을 사용하여 express app으로 만들어 주기
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //* Class Validation 적용! (birds.schema.ts)
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/api/docs', '/api/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // static파일 제공
  // http://localhost:port/media/birds/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  const config = new DocumentBuilder()
    .setTitle('Title: test')
    .setDescription('Bird')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors({
    // 개발할 때만 (origin에 특정 url만 작성!)
    origin: true,
    credentials: true,
  });
  const { PORT } = process.env;
  await app.listen(PORT);
}
bootstrap();
