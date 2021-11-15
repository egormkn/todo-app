import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import {
  AccountInterface,
  AccountType,
  accountTypes,
} from '../../common/interfaces/account.interface';
import { UserInterface } from '../../common/interfaces/user.interface';

export class CreateAccountDto implements Pick<AccountInterface, 'type' | 'id' | 'data'> {
  /**
   * A type of the account to connect
   * @example vkontakte
   */
  @IsIn(accountTypes)
  readonly type: AccountType;

  /**
   * An id of the account to connect
   * @example 49899993
   */
  @IsNotEmpty()
  readonly id: string;

  /**
   * Any additional data for the account
   */
  @IsOptional()
  readonly data: any;

  /**
   * Basic user info to assign to the user
   */
  @IsOptional()
  readonly info: Partial<UserInterface>;
}
