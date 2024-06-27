import { config } from 'dotenv'; // Import dotenv at the top
config(); // Load default .env file
console.log('Default environment variables loaded.');

if (process.env.NODE_ENV) {
  const envFilePath = `.env.${process.env.NODE_ENV}`;
  console.log(`Loading environment variables from ${envFilePath}`);
  config({ path: envFilePath });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from './swagger/swagger-config.interface';
import { TransformInterceptor } from './interceptor/respone.interceptor';
import { Logger } from './log/logger.service';

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

  // app.useGlobalInterceptors(new TransformInterceptor());
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
