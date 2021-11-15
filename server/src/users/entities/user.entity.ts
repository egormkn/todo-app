import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPasswordInterface } from '../../common/interfaces/user-password.interface';
import { UserRole } from '../../common/interfaces/user.interface';
import { Account } from './account.entity';

@Entity('users')
export class User implements UserPasswordInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 256, nullable: true, unique: true })
  email: string;

  @Index()
  @Column({ length: 32, nullable: true, unique: true })
  username: string;

  @Column({ length: 64, nullable: true, select: false })
  password: string;

  @Column({ default: 'user' })
  role: UserRole;

  @Column({ length: 64, nullable: true })
  name: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
