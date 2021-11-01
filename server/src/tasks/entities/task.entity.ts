import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskList } from './task-list.entity';

@Entity('task', {
  orderBy: {
    id: 'ASC',
  },
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  description: string;

  @Column('boolean')
  isDone: boolean;

  @ManyToOne((_type) => TaskList, (list) => list.tasks)
  list: TaskList;

  @CreateDateColumn()
  createdDate: number;
}
