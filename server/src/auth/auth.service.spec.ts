import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { createMockObj } from '../common/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: jest.Mocked<ConfigService>;
  let jwtService: jest.Mocked<JwtService>;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const mockedConfigService = createMockObj<ConfigService>();
    const mockedJwtService = createMockObj<JwtService>();
    const mockedUsersService = createMockObj<UsersService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: UsersService, useValue: mockedUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    configService = module.get(ConfigService) as jest.Mocked<ConfigService>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(configService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
