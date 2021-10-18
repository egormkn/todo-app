import { UserInterface } from './user.interface';

export interface AccountInterface {
  type: string;
  id: string;
  data: any;
  user: UserInterface;
}
