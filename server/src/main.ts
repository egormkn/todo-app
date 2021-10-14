import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
      exceptionFactory: (validationErrors = []) => {
        const errors = this.flattenValidationErrors(validationErrors);
        return new BadRequestException(errors);
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 80);

  await app.listen(port);
}
bootstrap();
