import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
