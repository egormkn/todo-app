import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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

  taskListForm = this.fb.group({
    title: ['', Validators.required],
  });

  errors?: string[];

  isReady = false;

  constructor(private fb: FormBuilder, private tasksService: TasksService, library: FaIconLibrary) {
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
    this.isReady = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.taskListForm.controls;
  }

  onSubmit(): void {
    if (this.taskListForm.valid) {
      this.isReady = false;
      const title = this.taskListForm.controls.title.value;
      const observer = {
        next: (list: TaskList | null) => {
          this.isReady = true;
          if (list) {
            console.log('Saved task list: ', list);
            this.onSave.emit(list);
          } else {
            console.error('Saved null task list');
          }
        },
        error: (error: any) => {
          this.isReady = true;
          console.error('Failed to save list: ', error);
        },
      };
      if (this.taskList) {
        this.tasksService.updateTaskList({ ...this.taskList, title }).subscribe(observer);
      } else {
        this.tasksService.addTaskList(title).subscribe(observer);
      }
    }
  }
}
