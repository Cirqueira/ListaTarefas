import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskFormEditComponent } from './pages/task-form-edit/task-form-edit.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskListMockComponent } from './pages/task-list-mock/task-list-mock.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioService } from './pages/services/usuario.service';
import { TarefasService } from './pages/services/tarefas.service';
import { TarefasResolve } from './pages/services/tarefas.resolve';

import { TaskFormGuard } from './pages/task-form/services/task-form.guard';
import { TaskFormEditGuard } from './pages/task-form-edit/services/task-form-edit.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskFormComponent,
    TaskFormEditComponent,
    TaskListComponent,
    TaskListMockComponent,
    MenuComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true
    }),
  ],
  providers: [
    UsuarioService,
    TarefasService,
    TarefasResolve,
    TaskFormGuard,
    TaskFormEditGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
