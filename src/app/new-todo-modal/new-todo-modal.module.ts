import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTodoModalPageRoutingModule } from './new-todo-modal-routing.module';

import { NewTodoModalPage } from './new-todo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTodoModalPageRoutingModule
  ],
  declarations: [NewTodoModalPage]
})
export class NewTodoModalPageModule {}
