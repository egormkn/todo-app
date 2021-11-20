import { Logger } from '@nestjs/common';
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

  const serverDocsPath = join(__dirname, '..', 'docs');
  if (existsSync(serverDocsPath)) {
    app.useStaticAssets(serverDocsPath, { prefix: `/docs/server` });
  }

  const serverCoveragePath = join(__dirname, '..', 'coverage', 'lcov-report');
  if (existsSync(serverCoveragePath)) {
    app.useStaticAssets(serverCoveragePath, { prefix: `/coverage/server` });
  }

  const client = configService.get<string>('CLIENT');

  if (client) {
    const clientDocsPath = join(__dirname, '..', client, 'docs');
    if (existsSync(clientDocsPath)) {
      app.useStaticAssets(clientDocsPath, { prefix: `/docs/client` });
    }

    const clientCoveragePath = join(__dirname, '..', client, 'coverage');
    if (existsSync(clientCoveragePath)) {
      app.useStaticAssets(clientCoveragePath, { prefix: `/coverage/client` });
    }

    const clientDistBrowser = join(__dirname, '..', client, 'dist', 'browser');
    const clientDistServer = join(__dirname, '..', client, 'dist', 'server');

    let engine, appBaseHref;
    try {
      const { getEngine, APP_BASE_HREF } = await import(join(clientDistServer, 'main.js'));
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
    app.setBaseViewsDir(clientDistBrowser);
    app.useStaticAssets(clientDistBrowser, { maxAge: '1y' });

    const indexHtml = existsSync(join(clientDistBrowser, 'index.original.html'))
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
