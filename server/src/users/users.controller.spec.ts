import { Test, TestingModule } from '@nestjs/testing';
import { createMockObj } from '../common/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const mockedUsersService = createMockObj<UsersService>([
      'findAllUsers',
      'findUserById',
      'findUserByUsername',
    ]);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockedUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
  });

  describe('#getAll', () => {
    it('should return all users', async () => {
      const expected = [] as User[];
      usersService.findAllUsers.mockResolvedValue(expected);

      const response = await usersController.getAll();

      expect(response).toHaveProperty('users');
      expect(response.users).toEqual(expected);
      expect(usersService.findAllUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getProfileById', () => {
    describe('when getting a profile of current user', () => {
      it('should return the current user', async () => {
        const id = 1;
        const user = { id } as User;

        const response = await usersController.getProfileById(id, user);

        expect(response).toHaveProperty('user');
        expect(response.user).toEqual(user);
        expect(usersService.findUserByUsername).toHaveBeenCalledTimes(0);
      });
    });

    describe('when getting a profile of another user', () => {
      it('should return the other user', async () => {
        const id = 1;
        const user = { id } as User;
        usersService.findUserById.mockResolvedValue(user);

        const response = await usersController.getProfileById(id);

        expect(response).toHaveProperty('user');
        expect(response.user).toEqual(user);
        expect(usersService.findUserById).toHaveBeenCalledTimes(1);
        expect(usersService.findUserById).toHaveBeenCalledWith(id);
      });
    });
  });

  describe('#getProfileByUsername', () => {
    describe('when getting a profile of current user', () => {
      it('should return the current user', async () => {
        const username = 'testuser';
        const user = { username } as User;

        const response = await usersController.getProfileByUsername(username, user);

        expect(response).toHaveProperty('user');
        expect(response.user).toEqual(user);
        expect(usersService.findUserByUsername).toHaveBeenCalledTimes(0);
      });
    });

    describe('when getting a profile of another user', () => {
      it('should return the other user', async () => {
        const username = 'testuser';
        const user = { username } as User;
        usersService.findUserByUsername.mockResolvedValue(user);

        const response = await usersController.getProfileByUsername(username);

        expect(response).toHaveProperty('user');
        expect(response.user).toEqual(user);
        expect(usersService.findUserByUsername).toHaveBeenCalledTimes(1);
        expect(usersService.findUserByUsername).toHaveBeenCalledWith(username);
      });
    });
  });
});
