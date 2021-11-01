import { Injectable } from '@angular/core';
import { TaskList } from './shared/task-list.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';
import { Task } from './shared/task.model';

export const tasksApiUrl = 'api/tasks';

@Injectable()
export class TasksService {
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private logger: LoggerService) {}

  addTaskList(title: string): Observable<TaskList | null> {
    const url = `${tasksApiUrl}/list`;
    const tasks: Task[] = [];
    const taskList = { title, tasks } as TaskList;
    return this.http.post<TaskList>(url, taskList, { headers: this.headers }).pipe(
      tap((list: TaskList) =>
        this.logger.log(`Added task list "${list.title}" with id: ${list.id}`),
      ),
      // catchError(error => {
      //   this.logger.log('Error: ', error);
      //   return of(null);
      // })
    );
  }

  getTaskLists(): Observable<TaskList[]> {
    const url = `${tasksApiUrl}/list`;
    return this.http.get<TaskList[]>(url).pipe(
      tap((lists: TaskList[]) => this.logger.log(`Fetched ${lists.length} task lists`)),
      // catchError(error => of([]))
    );
  }

  getTaskList(id: number): Observable<TaskList | null> {
    const url = `${tasksApiUrl}/list/${id}`;
    return this.http.get<TaskList>(url).pipe(
      tap((list: TaskList) =>
        this.logger.log(`Fetched task list "${list.title}" with id: ${list.id}`),
      ),
      // catchError(error => of(null))
    );
  }

  updateTaskList(taskList: TaskList): Observable<any> {
    const url = `${tasksApiUrl}/list/${taskList.id}`;
    return this.http
      .put(url, taskList, { headers: this.headers })
      .pipe
      // catchError(error => {
      //   console.error(error);
      //   return of();
      // })
      ();
  }
}
