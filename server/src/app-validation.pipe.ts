import { ValidationPipe } from '@nestjs/common';

export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
  }
}
