import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Logger } from '../logger/logger';
import { TaskList } from './shared/task-list.model';
import { Task } from './shared/task.model';

@Injectable()
export class FakeTasksService implements InMemoryDbService {
  private tasks: (Task & { list: number })[] = [
    {
      id: 0,
      title: 'Task 0',
      description: '',
      isDone: false,
      createdDate: 4000,
      list: 0,
    },
    {
      id: 1,
      title: 'Task 1',
      description: 'Has description',
      isDone: false,
      createdDate: 300,
      list: 0,
    },
    {
      id: 2,
      title: 'Task 2',
      description: '',
      isDone: false,
      createdDate: 200,
      list: 1,
    },
    {
      id: 3,
      title:
        'Task 3 with a very very very very very very very very very very very very very very long name',
      description: 'Has description',
      isDone: true,
      createdDate: 100,
      list: 1,
    },
    {
      id: 4,
      title: 'Task 4',
      description: '',
      isDone: false,
      createdDate: 200,
      list: 3,
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Has description',
      isDone: true,
      createdDate: 100,
      list: 3,
    },
    {
      id: 6,
      title: 'Task 6',
      description: '',
      isDone: false,
      createdDate: 200,
      list: 4,
    },
    {
      id: 7,
      title: 'Task 7',
      description: 'Has description',
      isDone: true,
      createdDate: 100,
      list: 4,
    },
  ];

  private lists: TaskList[] = [
    {
      id: 0,
      title: 'List 0',
      tasks: [this.tasks[0], this.tasks[1]],
    },
    {
      id: 1,
      title: 'List 1',
      tasks: [this.tasks[2], this.tasks[3]],
    },
    {
      id: 2,
      title:
        'List 2 with a very very very very very very very very very very very very very very long name',
      tasks: [],
    },
    {
      id: 3,
      title: 'List 3',
      tasks: [this.tasks[4], this.tasks[5]],
    },
    {
      id: 4,
      title: 'List 4',
      tasks: [this.tasks[6], this.tasks[7]],
    },
  ];

  constructor(private logger: Logger) {}

  createDb() {
    return { task: this.tasks, list: this.lists };
  }

  genId(tasks: TaskList[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map((list) => list.id)) + 1 : 1;
  }

  get(request: RequestInfo): Observable<any> | undefined {
    this.logger.log(`${request.method.toUpperCase()} ${request.url}`, request);
    return undefined;
  }

  post(request: RequestInfo): Observable<any> | undefined {
    this.logger.log(`${request.method.toUpperCase()} ${request.url}`, request);
    return undefined;
  }

  put(request: RequestInfo): Observable<any> | undefined {
    this.logger.log(`${request.method.toUpperCase()} ${request.url}`, request);
    return undefined;
  }
}
