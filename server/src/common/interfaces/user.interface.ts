import { ArrayElement } from '../utilities';
import { AccountInterface } from './account.interface';

export const userRoles = ['user', 'moderator', 'admin'] as const;

export type UserRole = ArrayElement<typeof userRoles>;

/**
 * An interface of a user
 */
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  accounts: AccountInterface[];
}
