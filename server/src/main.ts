import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import { AngularUniversalFilter } from './angular-universal.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Words App')
    .setDescription('Words API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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

  const clientDist = configService.get<string>('CLIENT_DIST');

  if (clientDist) {
    const browserDist = join(__dirname, '..', clientDist, 'browser');
    const serverDist = join(__dirname, '..', clientDist, 'server');

    const serverMain = join(serverDist, 'main.js');
    const { engine, APP_BASE_HREF } = await import(serverMain);

    app.engine('html', engine());
    app.setViewEngine('html');
    app.setBaseViewsDir(browserDist);
    app.useStaticAssets(browserDist, { maxAge: '1y' });

    const indexHtml = existsSync(join(browserDist, 'index.original.html'))
      ? 'index.original.html'
      : 'index';
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AngularUniversalFilter(indexHtml, APP_BASE_HREF, httpAdapter));
  }

  const host = configService.get<string>('HOST', 'localhost');
  const port = configService.get<number>('PORT', 80);

  await app.listen(port, async () => {
    const url = await app.getUrl();
    const logger = new Logger('NestApplication');
    logger.log(`Listening on http://${host}:${port} (${url})`);
  });
}
bootstrap();
