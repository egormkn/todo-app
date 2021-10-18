import { Role } from '../../common/interfaces/user.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';
import { AccountEntity } from './account.entity';

@Entity('user')
export class UserEntity implements UserPasswordInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: true, unique: true })
  email: string;

  @Column({ length: 20, nullable: true, unique: true })
  username: string;

  @Column({ length: 64, nullable: true, select: false })
  password: string;

  @Column({ default: 'user' })
  role: Role;

  @Column({ length: 80, nullable: true })
  name: string;

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];
}
