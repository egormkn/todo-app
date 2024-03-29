import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListEditorComponent } from './task-list-editor/task-list-editor.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { ModalService } from './modal/modal.service';

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskListEditorComponent,
    TaskComponent,
    ModalComponent,
    ModalDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    TasksRoutingModule,
    // HttpClientInMemoryWebApiModule.forFeature(
    //   FakeTasksService, {
    //     apiBase: tasksApiUrl,
    //     dataEncapsulation: false,
    //     delay: 1000
    //   }
    // ),
  ],
  providers: [ModalService, TasksService],
})
export class TasksModule {}
