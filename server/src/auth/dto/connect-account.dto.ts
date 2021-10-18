import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { AccountInterface } from '../../common/interfaces/account.interface';
import { UserInterface } from '../../common/interfaces/user.interface';

export class ConnectAccountDto implements Omit<AccountInterface, 'user'> {
  /**
   * A type of the account to connect
   * @example vkontakte
   */
  @IsIn(['google', 'vkontakte'])
  type: string;

  /**
   * An id of the account to connect
   * @example 49899993
   */
  @IsNotEmpty()
  id: string;

  /**
   * Any additional data for the account
   */
  @IsOptional()
  data: any;

  /**
   * Basic user info to assign to the user
   */
  @IsOptional()
  info: Partial<UserInterface>;
}
