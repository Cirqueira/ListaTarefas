import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskFormEditComponent } from './pages/task-form-edit/task-form-edit.component';
import { TaskListMockComponent } from './pages/task-list-mock/task-list-mock.component';
import { TarefasResolve } from './pages/services/tarefas.resolve';
import { TaskFormGuard } from './pages/task-form/services/task-form.guard';
import { TaskFormEditGuard } from './pages/task-form-edit/services/task-form-edit.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'task-list', component: TaskListComponent},
  { path: 'task-list-mock', component: TaskListMockComponent },
  { path: 'task-form', component: TaskFormComponent, canDeactivate: [TaskFormGuard] },
  { path: 'task-form-edit/:id', component: TaskFormEditComponent, canDeactivate: [TaskFormEditGuard],
    resolve: {
      tarefa: TarefasResolve
    }
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
