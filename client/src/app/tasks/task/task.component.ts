import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../modal/modal.service';
import { Task } from '../shared/task.model';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  constructor(private modalService: ModalService, library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faTrash);
  }

  ngOnInit(): void {}

  editTask(task: Task) {
    this.modalService.open('Edit task', TaskEditorComponent, { task });
  }

  deleteTask(task: Task) {
    this.modalService.open('Delete task', TaskEditorComponent, { task });
  }
}
