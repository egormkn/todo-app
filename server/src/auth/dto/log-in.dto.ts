import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';

export class LogInDto implements Pick<UserPasswordInterface, 'username' | 'password'> {
  /**
   * An username of the user
   * @example john
   */
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Matches(/^(?:[a-z0-9]+[-])*[a-z0-9]+$/i, {
    message:
      'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen',
  })
  readonly username: string;

  /**
   * A password of the user
   * @example 12345678
   */
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password should contain at least 8 characters' })
  readonly password: string;
}
