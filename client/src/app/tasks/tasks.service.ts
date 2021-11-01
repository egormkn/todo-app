import { Injectable } from '@angular/core';
import { TaskList } from './shared/task-list.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';
import { Task } from './shared/task.model';

export const apiPrefix = '/api';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  addTaskList(title: string): Observable<TaskList | null> {
    const url = `${apiPrefix}/tasks/list`;
    const tasks: Task[] = [];
    const taskList = { title, tasks } as TaskList;
    return this.http
      .post<TaskList>(url, taskList)
      .pipe(
        tap((list: TaskList) =>
          this.logger.log(`Added task list "${list.title}" with id: ${list.id}`),
        ),
      );
  }

  getTaskLists(): Observable<TaskList[]> {
    const url = `${apiPrefix}/tasks/list`;
    return this.http.get<TaskList[]>(url).pipe(
      tap((lists: TaskList[]) => this.logger.log(`Fetched ${lists.length} task lists`)),
      // catchError(error => of([]))
    );
  }

  getTaskList(id: number): Observable<TaskList | null> {
    const url = `${apiPrefix}/tasks/list/${id}`;
    return this.http.get<TaskList>(url).pipe(
      tap((list: TaskList) =>
        this.logger.log(`Fetched task list "${list.title}" with id: ${list.id}`),
      ),
      // catchError(error => of(null))
    );
  }

  updateTaskList(taskList: TaskList): Observable<any> {
    const url = `${apiPrefix}/tasks/list/${taskList.id}`;
    return this.http
      .patch(url, taskList)
      .pipe(
        tap((list: any) =>
          this.logger.log(`Updated task list "${list.title}" with id: ${list.id}`),
        ),
      );
  }
}
