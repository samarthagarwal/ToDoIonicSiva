import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTodoModalPage } from './new-todo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewTodoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTodoModalPageRoutingModule {}
