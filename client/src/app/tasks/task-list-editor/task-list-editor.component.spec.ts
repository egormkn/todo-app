import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListEditorComponent } from './task-list-editor.component';

describe('TaskListEditorComponent', () => {
  let component: TaskListEditorComponent;
  let fixture: ComponentFixture<TaskListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
