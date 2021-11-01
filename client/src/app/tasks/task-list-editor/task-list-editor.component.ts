import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TaskList } from '../shared/task-list.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list-editor',
  templateUrl: './task-list-editor.component.html',
  styleUrls: ['./task-list-editor.component.scss'],
})
export class TaskListEditorComponent implements OnInit {
  @Input()
  taskList?: TaskList;

  @Output()
  onSave = new EventEmitter<TaskList>();

  taskListForm: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  isReady = true;

  constructor(private tasksService: TasksService, library: FaIconLibrary) {
    library.addIcons(faSave, faSpinner);
  }

  ngOnInit(): void {
    if (this.taskList) {
      const title = this.taskList.title;
      this.taskListForm.controls.title.setValue(title);
      this.taskListForm.controls.title.addValidators((control) => {
        return title == control.value ? { sameValue: { value: control.value } } : null;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  onSubmit(): void {
    this.isReady = false;
    const title = this.taskListForm.controls.title.value;
    if (this.taskList) {
      this.tasksService.updateTaskList({ ...this.taskList, title }).subscribe(
        (list) => {
          this.onSuccess(list);
        },
        (error) => {
          this.onError(error);
        },
      );
    } else {
      this.tasksService.addTaskList(title).subscribe(
        (list) => {
          this.onSuccess(list);
        },
        (error) => {
          this.onError(error);
        },
      );
    }
  }

  onSuccess(list: TaskList | null): void {
    this.isReady = true;
    if (list) {
      console.log('Saved task list: ', list);
      this.onSave.emit(list);
    } else {
      console.error('Saved null task list');
    }
  }

  onError(error: any): void {
    console.error('Failed to save list: ', error);
    this.isReady = true;
  }
}
