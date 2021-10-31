import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/log-in.dto';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { omit } from '../common/utilities';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async logIn(logInDto: LogInDto): Promise<UserInterface | null> {
    const { username, password } = logInDto;
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return omit(user, 'password') as UserInterface;
      }
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto): Promise<UserInterface | null> {
    const { username, password, name, email } = signUpDto;
    const saltRounds = this.configService.get<number>('SALT_ROUNDS', 10);
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await this.usersService.createUser({ username, password: hash, name, email });
    if (user) {
      return omit(user, 'password') as UserInterface;
    }
    return null;
  }

  async issueJwt(user: UserInterface): Promise<string> {
    const payload = { name: user.name, username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async logOut(_user: UserInterface) {
    throw new Error('Method not implemented.');
  }

  // async authenticate(connectUserDto: ConnectUserDto): Promise<UserInterface> {
  //   let user: UserEntity,
  //     account = await this.usersService.findAccount(connectUserDto.type, connectUserDto.id);
  //   if (!account) {
  //     this.logger.log('authorize: Account not found');
  //     user = await this.usersService.createUser(connectUserDto.info);
  //     this.logger.log(`authorize: New user #${user.id}: ${JSON.stringify(user)}`);
  //     account = await this.usersService.createAccount({ ...connectUserDto, user });
  //   } else {
  //     this.logger.log('authorize: Using existing account');
  //     user = account.user;
  //     account.data = connectUserDto.data;
  //     await this.usersService.updateAccount(account);
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password, ...result } = user;
  //   return result;
  // }
}
