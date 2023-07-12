import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const logger = new Logger('main.ts');
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const SWAGGER = configService.get<boolean>('SWAGGER');

  if (SWAGGER) {
    const config = new DocumentBuilder()
      .setTitle('Mirrar')
      .setDescription('The Mirrar API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => {
    logger.log(`Application is listening on: http://localhost:${PORT}`);

    if (SWAGGER) {
      logger.log(`Explore rest swagger on: http://localhost:${PORT}/swagger`);
    }
  });
}
bootstrap();
