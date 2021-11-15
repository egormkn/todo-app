import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { existsSync, readFile } from 'fs';
import * as helmet from 'helmet';
import { join } from 'path';
import { AngularUniversalFilter } from './angular-universal.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  logger.log(`Working directory: ${process.cwd()}`);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  const api = {
    title: configService.get<string>('API_TITLE', 'Application'),
    description: configService.get<string>('API_DESCRIPTION', 'API description'),
    version: configService.get<string>('API_VERSION', '1.0'),
    prefix: configService.get<string>('API_PREFIX', '/api'),
  };

  app.setGlobalPrefix(api.prefix);

  const config = new DocumentBuilder()
    .setTitle(api.title)
    .setExternalDoc('Download OpenAPI specification', `${api.prefix}-json`)
    .setDescription(api.description)
    .setVersion(api.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(api.prefix, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const clientDist = configService.get<string>('CLIENT_DIST');

  if (clientDist) {
    const browserDist = join(__dirname, '..', clientDist, 'browser');
    const serverDist = join(__dirname, '..', clientDist, 'server');
    const serverMain = join(serverDist, 'main.js');

    let engine, appBaseHref;
    try {
      const { getEngine, APP_BASE_HREF } = await import(serverMain);
      engine = getEngine();
      appBaseHref = APP_BASE_HREF;
    } catch {
      engine = (filePath: string, _: any, callback: any) => {
        return readFile(filePath, function (err, data) {
          if (err) return callback(err);
          return callback(null, data.toString());
        });
      };
      appBaseHref = 'APP_BASE_HREF';
      new Logger('SSRLoader').warn('Server-side rendering is disabled');
    }

    app.engine('html', engine);
    app.setViewEngine('html');
    app.setBaseViewsDir(browserDist);
    app.useStaticAssets(browserDist, { maxAge: '1y' });

    const indexHtml = existsSync(join(browserDist, 'index.original.html'))
      ? 'index.original.html'
      : 'index.html';
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AngularUniversalFilter(indexHtml, appBaseHref, httpAdapter));
  }

  const host = configService.get<string>('HOST', 'localhost');
  const port = configService.get<number>('PORT', 80);

  await app.listen(port, async () => {
    const url = await app.getUrl();
    logger.log(`Listening on http://${host}:${port} (${url})`);
  });
}
bootstrap();
