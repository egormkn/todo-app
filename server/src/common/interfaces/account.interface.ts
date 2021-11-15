import { ArrayElement } from '../utilities';
import { UserInterface } from './user.interface';

export const accountTypes = ['facebook', 'google', 'vkontakte'] as const;

export type AccountType = ArrayElement<typeof accountTypes>;

/**
 * An interface of a social account
 */
export interface AccountInterface {
  type: AccountType;
  id: string;
  data: any;
  user: UserInterface;
}
