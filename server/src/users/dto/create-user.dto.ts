import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';

export class CreateUserDto implements Partial<UserPasswordInterface> {
  /**
   * An username of the user
   * @example john
   */
  @IsOptional()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Matches(/^(?:[a-z0-9]+[-])*[a-z0-9]+$/i, {
    message:
      'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen',
  })
  readonly username?: string;

  /**
   * A password of the user
   * @example 12345678
   */
  @IsOptional()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password should contain at least 8 characters' })
  readonly password?: string;

  /**
   * A name of the user
   * @example John Doe
   */
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter a name' })
  readonly name?: string;

  /**
   * An email address of the user
   * @example john@example.com
   */
  @IsOptional()
  @IsNotEmpty({ message: 'Please enter an email address' })
  @IsEmail(undefined, { message: 'Please provide a valid email address' })
  readonly email?: string;
}
