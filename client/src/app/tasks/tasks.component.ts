import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './modal/modal.service';
import { TaskList } from './shared/task-list.model';
import { TaskListEditorComponent } from './task-list-editor/task-list-editor.component';
import { TasksService } from './tasks.service';
// import * as Masonry from 'masonry-layout';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskLists: TaskList[] = [];

  isReady = false;

  constructor(
    private tasksService: TasksService,
    private modalService: ModalService,
    library: FaIconLibrary,
  ) {
    library.addIcons(faSpinner, faPlus, faArrowLeft);
  }

  ngOnInit(): void {
    this.getTaskLists();
  }

  getTaskLists(): void {
    this.isReady = false;
    this.tasksService.getTaskLists().subscribe(
      (taskLists) => {
        this.taskLists = taskLists;
        this.isReady = true;
      },
      (error) => {
        console.log(error);
        this.isReady = true;
      },
    );
  }

  addTaskList(): void {
    this.modalService.open(
      'Add task list',
      TaskListEditorComponent,
      {},
      {
        onSave: (taskList) => {
          this.onAddTaskList(taskList);
        },
      },
    );
  }

  onAddTaskList(taskList: TaskList) {
    if (taskList) {
      console.log('Adding new task list:', taskList);
      this.taskLists.push(taskList);
    } else {
      console.error('Adding null task list');
    }
    this.modalService.closeAll();
  }

  onDeleteTaskList(taskList: TaskList) {
    this.taskLists = this.taskLists.filter((l) => l !== taskList);
  }
}
