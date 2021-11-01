import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { IndexComponent } from './index/index.component';

const authModule = () => import('./auth/auth.module').then((m) => m.AuthModule);
const wordsModule = () => import('./words/words.module').then((m) => m.WordsModule);
const tasksModule = () => import('./tasks/tasks.module').then((m) => m.TasksModule);
const httpStatusModule = () =>
  import('./http-status/http-status.module').then((m) => m.HttpStatusModule);

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: authModule },
  { path: 'words', loadChildren: wordsModule, canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: tasksModule, canActivate: [AuthGuard] },
  { path: '**', loadChildren: httpStatusModule },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
