import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { LoginComponent } from './pages/login/login.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-form', component: TaskFormComponent },
  // { path: 'task-form/new', component: TaskFormComponent },
  // { path: 'task-form/edit/:id', component: TaskFormComponent },
  // { path: 'nao-encontrado', component: NotFoundComponent},
  // { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
