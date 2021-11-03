import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../common/interfaces/user.interface';
import { omit } from '../common/utilities';
import { UsersService } from '../users/users.service';
import { ConnectAccountDto } from './dto/connect-account.dto';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async logIn(logInDto: LogInDto): Promise<UserInterface> {
    const { username, password } = logInDto;
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) {
      throw new UnauthorizedException('The user does not exist');
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return omit(user, 'password') as UserInterface;
    } else {
      throw new UnauthorizedException('Wrong username or password');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<UserInterface | null> {
    const { username, password, name, email } = signUpDto;
    const saltRounds = this.configService.get<number>('PASSWORD_SALT_ROUNDS', 10);
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await this.usersService.createUser({ username, password: hash, name, email });
    if (user) {
      return omit(user, 'password') as UserInterface;
    }
    return null;
  }

  async loginWithAccount(connectAccountDto: ConnectAccountDto) {
    const { type, id, info } = connectAccountDto;
    const account = await this.usersService.findAccount(type, id);
    if (!account) {
      this.logger.log('Creating new user');
      const user = await this.usersService.createUser(info);
      if (user) {
        this.logger.log(`New user #${user.id}: ${user.name} (${user.username})`);
        const account = await this.usersService.createAccount(user.id, connectAccountDto);
        if (account) return omit(user, 'password') as UserInterface;
      }
    } else {
      this.logger.log('Authenticating with account');
      const user = account.user;
      // account.data = connectUserDto.data;
      // await this.usersService.updateAccount(account);
      return omit(user, 'password') as UserInterface;
    }
    throw new Error('Something went wrong');
  }

  async connectAccount(
    connectAccountDto: ConnectAccountDto,
    user: UserInterface,
  ): Promise<UserInterface> {
    const { type, id } = connectAccountDto;
    const account = await this.usersService.findAccount(type, id);
    if (account && account.user.id != user.id) {
      throw new BadRequestException('This account is already connected to another user');
    } else if (account) {
      throw new BadRequestException('This account is already connected');
    } else if (user.accounts.some((account) => account.type === type)) {
      throw new BadRequestException('Another account of this service is already connected');
    }
    const newAccount = await this.usersService.createAccount(user.id, connectAccountDto);
    if (newAccount) return user;
    throw new Error('Something went wrong');
  }

  async issueJwt(user: UserInterface): Promise<string> {
    const payload = { name: user.name, username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async findUser(id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async logOut(user: UserInterface) {
    throw new Error('Method not implemented');
  }
}
