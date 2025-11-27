import { AllExceptionsFilter } from '@base/filters/all-exceptions.filter';
import { ResponseInterceptor } from '@base/interceptors/response.interceptor';
import { GLOBAL_PREFIX } from '@constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { corsConfig } from './configs/cors.config';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors(corsConfig);
  app.use(helmet());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validateCustomDecorators: true,
      transform: true,
    }),
  );

  if (configService.get('NODE_ENV') === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NestJS Template API')
      .setDescription('NestJS Template API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'method',
        persistAuthorization: true,
      },
    });
  }
  await app.listen(configService.get('PORT') || 3000, '0.0.0.0');
  logger.log(`Nest application is running on: ${await app.getUrl()}`);
}
bootstrap();
