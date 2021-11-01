import { Task } from './task.model';

export interface TaskList {
  id: number;
  title: string;
  tasks: Task[];
}
