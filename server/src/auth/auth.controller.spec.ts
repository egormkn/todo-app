import { Test, TestingModule } from '@nestjs/testing';
import { UserInterface } from '../common/interfaces/user.interface';
import { createMockObj } from '../common/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockedAuthService = createMockObj<AuthService>(['logIn', 'signUp', 'issueJwt', 'logOut']);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  describe('#logIn', () => {
    it('should return JWT', async () => {
      const user = {} as UserInterface;
      const token = 'test_token';
      authService.issueJwt.mockResolvedValue(token);

      const result = await authController.logIn(user);

      expect(result).toEqual({ access_token: token });
      expect(authService.issueJwt).toBeCalledWith(user);
    });
  });

  describe('#signUp', () => {
    it('should create user and return JWT', async () => {
      const dto = {} as SignUpDto;
      const user = {} as UserInterface;
      const token = 'test_token';
      authService.signUp.mockResolvedValue(user);
      authService.issueJwt.mockResolvedValue(token);

      const result = await authController.signUp(dto);

      expect(result).toEqual({ access_token: token });
      expect(authService.signUp).toBeCalledWith(dto);
      expect(authService.issueJwt).toBeCalledWith(user);
    });
  });

  describe('#logOut', () => {
    it('should call AuthService#logOut', async () => {
      const user = {} as UserInterface;

      await authController.logOut(user);

      expect(authService.logOut).toBeCalledWith(user);
    });
  });

  describe('#logInWithGoogle', () => {
    it('should return JWT', async () => {
      const user = {} as UserInterface;
      const token = 'test_token';
      authService.issueJwt.mockResolvedValue(token);

      const result = await authController.logInWithGoogle(user);

      expect(result).toEqual({ access_token: token });
      expect(authService.issueJwt).toBeCalledWith(user);
    });
  });

  describe('#logInWithVkontakte', () => {
    it('should return JWT', async () => {
      const user = {} as UserInterface;
      const token = 'test_token';
      authService.issueJwt.mockResolvedValue(token);

      const result = await authController.logInWithVkontakte(user);

      expect(result).toEqual({ access_token: token });
      expect(authService.issueJwt).toBeCalledWith(user);
    });
  });
});
