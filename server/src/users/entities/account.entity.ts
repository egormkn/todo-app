import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { AccountInterface, AccountType } from '../../common/interfaces/account.interface';
import { User } from './user.entity';

@Entity('accounts')
@Unique(['type', 'id'])
@Unique(['type', 'user'])
export class Account implements AccountInterface {
  @PrimaryColumn()
  type: AccountType;

  @PrimaryColumn()
  id: string;

  @Column('simple-json')
  data: any;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
