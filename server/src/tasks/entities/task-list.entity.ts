import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('task-list', {
  orderBy: {
    id: 'ASC',
  },
})
export class TaskList {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  public title: string;

  @OneToMany((_type) => Task, (task) => task.list, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public tasks: Task[];
}
