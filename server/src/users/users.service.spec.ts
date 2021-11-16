import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { createMockObj } from '../common/testing';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: jest.Mocked<Repository<User>>;
  let accountsRepository: jest.Mocked<Repository<Account>>;

  beforeEach(async () => {
    const usersRepositoryToken = getRepositoryToken(User);
    const accountsRepositoryToken = getRepositoryToken(Account);
    const mockedUsersRepository = createMockObj<Repository<User>>(['findOne', 'create']);
    const mockedAccountsRepository = createMockObj<Repository<Account>>(['findOne', 'create']);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: usersRepositoryToken, useValue: mockedUsersRepository },
        { provide: accountsRepositoryToken, useValue: mockedAccountsRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(usersRepositoryToken) as jest.Mocked<Repository<User>>;
    accountsRepository = module.get(accountsRepositoryToken) as jest.Mocked<Repository<Account>>;
  });

  describe('#findUserById', () => {
    describe('when user with id exists', () => {
      it('should return the user object', async () => {
        const id = 1;
        const expected = {} as User;
        jest.spyOn(usersRepository, 'findOne').mockResolvedValue(expected);

        const user = await usersService.findUserById(id);

        expect(user).toEqual(expected);
      });
    });

    describe('when user with id does not exist', () => {
      it('should throw the NotFoundException', async () => {
        const id = 1;
        jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

        try {
          await usersService.findUserById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${id} was not found`);
        }
      });
    });
  });

  describe('#findAccount', () => {
    describe('when account with type and id exists', () => {
      it('should return the account object', async () => {
        const type = 'google';
        const id = 'test';
        const expected = { type, id } as Account;
        jest.spyOn(accountsRepository, 'findOne').mockResolvedValue(expected);

        const account = await usersService.findAccount(type, id);

        expect(account).toEqual(expected);
      });
    });

    describe('when account with type and id does not exist', () => {
      it('should throw the NotFoundException', async () => {
        const type = 'google';
        const id = 'test';
        jest.spyOn(accountsRepository, 'findOne').mockResolvedValue(undefined);

        try {
          await usersService.findAccount(type, id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Account ${id}@${type} was not found`);
        }
      });
    });
  });
});
