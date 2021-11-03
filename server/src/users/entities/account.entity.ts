import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { AccountInterface } from '../../common/interfaces/account.interface';
import { UserEntity } from './user.entity';

@Entity('account')
@Unique(['type', 'id'])
@Unique(['type', 'user'])
export class AccountEntity implements AccountInterface {
  @PrimaryColumn()
  type: string;

  @PrimaryColumn()
  id: string;

  @Column('simple-json')
  data: any;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;
}
