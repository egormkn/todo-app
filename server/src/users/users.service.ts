import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPasswordInterface } from 'src/common/interfaces/user-password.interface';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccountEntity } from './entities/account.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountsRepository: Repository<AccountEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user).catch((error) => {
      const { message } = error;
      if (/unique/i.test(message) && /username/i.test(message)) {
        throw new BadRequestException('This username is already taken.');
      }
      if (/unique/i.test(message) && /email/i.test(message)) {
        throw new BadRequestException('This email is already used by another account.');
      }
      throw new BadRequestException(`Error while creating a user: ${message}`);
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto).catch((error) => {
      const { message } = error;
      if (/unique/i.test(message) && /username/i.test(message)) {
        throw new BadRequestException('This username is already taken.');
      }
      if (/unique/i.test(message) && /email/i.test(message)) {
        throw new BadRequestException('This email is already used by another account.');
      }
      throw new BadRequestException(`Error while updating a user: ${message}`);
    });
  }

  async removeUser(id: number): Promise<any> {
    return this.usersRepository.delete(id).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while deleting a user: ${message}`);
    });
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = this.accountsRepository.create(createAccountDto);
    this.logger.debug(`Create account: ${JSON.stringify(account)}`);
    return this.accountsRepository.save(account).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while creating an account: ${message}`);
    });
  }

  async updateAccount(type: string, id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountsRepository.update({ type, id }, updateAccountDto).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while updating an account: ${message}`);
    });
  }

  async removeAccount(type: string, id: string): Promise<any> {
    return this.accountsRepository.delete({ type, id }).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while removing an account: ${message}`);
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({ relations: ['accounts'] }).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while finding the users: ${message}`);
    });
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne(id, { relations: ['accounts'] }).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while finding the user by id: ${message}`);
    });
  }

  async findByUsername(username: string) {
    return this.usersRepository
      .findOne({
        where: { username },
        relations: ['accounts'],
        select: ['username', 'password'],
      })
      .catch((error) => {
        const { message } = error;
        throw new BadRequestException(`Error while finding the user by username: ${message}`);
      });
  }

  async findByUsernameWithPassword(username: string): Promise<UserPasswordInterface | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne()
      .catch((error) => {
        const { message } = error;
        throw new BadRequestException(
          `Error while finding the user/password by username: ${message}`,
        );
      });
  }

  async findByEmail(email: string) {
    return this.usersRepository
      .findOne({ where: { email }, relations: ['accounts'] })
      .catch((error) => {
        const { message } = error;
        throw new BadRequestException(`Error while finding the user by email: ${message}`);
      });
  }

  async findAccount(type: string, id: string) {
    return this.accountsRepository
      .findOne({
        where: { type, id },
        relations: ['user'],
      })
      .catch((error) => {
        const { message } = error;
        throw new BadRequestException(`Error while finding the account: ${message}`);
      });
  }
}
