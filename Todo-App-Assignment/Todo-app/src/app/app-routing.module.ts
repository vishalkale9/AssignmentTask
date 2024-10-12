import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from 'src/Components/task-form/task-form.component';
import { TaskListComponent } from 'src/Components/task-list/task-list.component';

const routes: Routes = [
  // {
  //   path :'',
  //   component : TaskListComponent,
  // },
  {
    path : '',
    component : TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
