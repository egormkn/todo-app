import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserPasswordInterface } from '../common/interfaces/user-password.interface';
import { createMockObj } from '../common/testing';
import { omit } from '../common/utilities';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: jest.Mocked<ConfigService>;
  let jwtService: jest.Mocked<JwtService>;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const mockedConfigService = createMockObj<ConfigService>(['get']);
    const mockedJwtService = createMockObj<JwtService>();
    const mockedUsersService = createMockObj<UsersService>(['findUserByUsername', 'createUser']);

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

  describe('#logIn', () => {
    it('should return user if passwords match', async () => {
      const username = 'username';
      const password = 'password';
      const logInDto = { username, password } as LogInDto;
      const hash = await bcrypt.hash(password, 10);
      const user = { username, password: hash } as UserPasswordInterface;
      usersService.findUserByUsername.mockResolvedValue(user as User);

      const result = await authService.logIn(logInDto);

      expect(result).toEqual(omit(user, 'password'));
      expect(result).not.toHaveProperty('password');
    });

    it('should throw an exception if user was not found', async () => {
      const username = 'username';
      const password = 'password';
      const logInDto = { username, password } as LogInDto;
      usersService.findUserByUsername.mockImplementation(() => {
        throw new NotFoundException(`User "${username}" was not found`);
      });

      try {
        const _result = await authService.logIn(logInDto);
        fail('exception expected');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw an exception if passwords do not match', async () => {
      const username = 'username';
      const password = 'wrong-password';
      const logInDto = { username, password } as LogInDto;
      const hash = await bcrypt.hash('password', 10);
      const user = { username, password: hash } as UserPasswordInterface;
      usersService.findUserByUsername.mockResolvedValue(user as User);

      try {
        const _result = await authService.logIn(logInDto);
        fail('exception expected');
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('#signUp', () => {
    it('should return the user that was created', async () => {
      const username = 'username';
      const password = 'password';
      const signUpDto = { username, password } as SignUpDto;
      const saltRounds = 10;
      configService.get.mockReturnValue(saltRounds);
      const hash = await bcrypt.hash(password, saltRounds);
      const user = { username, password: hash } as UserPasswordInterface;
      usersService.createUser.mockResolvedValue(user as User);

      const result = await authService.signUp(signUpDto);

      expect(result).toEqual(omit(user, 'password'));
      expect(result).not.toHaveProperty('password');
      expect(configService.get).toBeCalled();
      expect(usersService.createUser).toBeCalled();
    });

    it('should throw an exception if user was not created', async () => {
      const username = 'username';
      const password = 'password';
      const signUpDto = { username, password } as SignUpDto;
      const saltRounds = 10;
      configService.get.mockReturnValue(saltRounds);
      usersService.createUser.mockImplementation(() => {
        throw new BadRequestException();
      });

      try {
        const _result = await authService.signUp(signUpDto);
        fail('exception expected');
      } catch (e) {
        expect(usersService.createUser).toBeCalled();
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
