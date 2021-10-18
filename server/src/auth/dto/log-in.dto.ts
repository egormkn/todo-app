import { IsNotEmpty, Matches } from 'class-validator';
import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';

export class LogInDto implements Pick<UserPasswordInterface, 'username' | 'password'> {
  /**
   * A name of the user
   * @example john
   */
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Matches(/^([a-z0-9]+-)*[a-z0-9]+$/i, {
    message:
      'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen',
  })
  username: string;

  /**
   * A password of the user
   * @example password
   */
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
