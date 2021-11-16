import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user).catch(({ message }) => {
      if (/unique/i.test(message) && /username/i.test(message)) {
        throw new BadRequestException('This username is already taken.');
      }
      if (/unique/i.test(message) && /email/i.test(message)) {
        throw new BadRequestException('This email is already used by another account.');
      }
      throw new BadRequestException(`Error while creating a user: ${message}`);
    });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, { relations: ['accounts'] });
    if (!user) {
      throw new NotFoundException(`User #${id} was not found`);
    }
    return user;
  }

  async findUserByUsername(username: string, withPassword = false): Promise<User> {
    let query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accounts', 'account')
      .where('user.username = :username', { username });
    if (withPassword) {
      query = query.addSelect('user.password');
    }
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException(`User "${username}" was not found`);
    }
    return user;
  }

  async findUserByEmail(email: string, withPassword = false) {
    let query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accounts', 'account')
      .where('user.email = :email', { email });
    if (withPassword) {
      query = query.addSelect('user.password');
    }
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException(`User with email ${email} was not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} was not found`);
    }
    return this.usersRepository.save(user).catch(({ message }) => {
      if (/unique/i.test(message) && /username/i.test(message)) {
        throw new BadRequestException('This username is already taken.');
      }
      if (/unique/i.test(message) && /email/i.test(message)) {
        throw new BadRequestException('This email is already used by another account.');
      }
      throw new BadRequestException(`Error while updating a user: ${message}`);
    });
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.findUserById(id);
    return this.usersRepository.remove(user).catch(({ message }) => {
      throw new BadRequestException(`Error while deleting a user: ${message}`);
    });
  }

  async createAccount(id: number, createAccountDto: CreateAccountDto): Promise<Account> {
    const user = await this.findUserById(id);
    const account = this.accountsRepository.create({ ...createAccountDto, user });
    this.logger.debug(`Create account: ${JSON.stringify(account)}`);
    return this.accountsRepository.save(account).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while creating an account: ${message}`);
    });
  }

  async updateAccount(
    type: Account['type'],
    id: Account['id'],
    updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsRepository.update({ type, id }, updateAccountDto).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while updating an account: ${message}`);
    });
  }

  async removeAccount(type: Account['type'], id: Account['id']): Promise<any> {
    return this.accountsRepository.delete({ type, id }).catch((error) => {
      const { message } = error;
      throw new BadRequestException(`Error while removing an account: ${message}`);
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['accounts'] }).catch(({ message }) => {
      throw new BadRequestException(`Error while finding the users: ${message}`);
    });
  }

  async findAccount(type: string, id: string) {
    const account = await this.accountsRepository.findOne({
      where: { type, id },
      relations: ['user'],
    });
    if (!account) {
      throw new NotFoundException(`Account ${id}@${type} was not found`);
    }
    return account;
  }
}
