import { AccountInterface } from '../../common/interfaces/account.interface';
import { UserInterface } from '../../common/interfaces/user.interface';

export class CreateAccountDto implements Omit<AccountInterface, 'user'> {
  type: string;
  id: string;
  data: any;
  info: Partial<UserInterface>;
}
