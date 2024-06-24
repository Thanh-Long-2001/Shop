import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as config from './config/config.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from './swagger/swagger-config.interface';
import { TransformInterceptor } from './interceptor/respone.interceptor';
import { Logger } from './Log/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Shop test API')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('test', app, document);

  await app.listen(3000);
}
bootstrap();
