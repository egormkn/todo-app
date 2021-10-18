import { AccountInterface } from './account.interface';

export type Role = 'user' | 'moderator' | 'admin';

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  role: Role;
  name: string;
  accounts: AccountInterface[];
}
