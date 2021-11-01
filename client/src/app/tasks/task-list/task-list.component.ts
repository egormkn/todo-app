import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../modal/modal.service';
import { TaskList } from '../shared/task-list.model';
import { TaskListEditorComponent } from '../task-list-editor/task-list-editor.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList!: TaskList;

  @Output() onDelete = new EventEmitter<any>();

  constructor(private modalService: ModalService, library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faTrash, faPlus);
  }

  ngOnInit(): void {}

  editTaskList(taskList: TaskList) {
    this.modalService.open(
      'Edit task list',
      TaskListEditorComponent,
      { taskList },
      {
        onSave: this.onEditTaskList,
      },
    );
  }

  onEditTaskList(taskList: TaskList) {
    console.log('Edited task list:', taskList);
    this.taskList = taskList;
    this.modalService.closeAll();
  }

  deleteTaskList(taskList: TaskList) {
    this.modalService.open(
      'Delete task list',
      TaskListEditorComponent,
      { taskList },
      {
        onSave: (taskList: any) => {
          this.onEditTaskList(taskList);
        },
      },
    );
  }

  onDeleteTaskList(taskList: TaskList) {
    console.log('Deleted task list:', taskList);
    this.onDelete.emit();
    this.modalService.closeAll();
  }

  addTask(taskList: TaskList) {}
}
