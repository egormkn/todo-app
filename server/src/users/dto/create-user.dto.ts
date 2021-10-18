import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';

export class CreateUserDto implements Partial<UserPasswordInterface> {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
}
