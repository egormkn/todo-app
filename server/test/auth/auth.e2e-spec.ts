import { Test, TestingModule } from '@nestjs/testing';
import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../config-service.mock';

describe('Auth [/auth]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(ConfigService)
      .useValue(
        mockedConfigService({
          JWT_SECRET: 'secret',
          GOOGLE_CLIENT_ID: 'fake_client_id',
          VKONTAKTE_CLIENT_ID: 'fake_client_id',
        }),
      )
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo('Log in [POST /login]');

  it.todo('Sign up [POST /signup]');

  it.todo('Log out [POST /logout]');

  it.todo('Log In [POST /login]');

  it('Authenticate with Google [GET /google]', () => {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=&client_id=fake_client_id';
    return request(app.getHttpServer())
      .get('/auth/google')
      .expect(HttpStatus.FOUND)
      .expect('Location', url);
  });

  it.todo('Authenticate with Vkontakte [GET /vkontakte]');
});
