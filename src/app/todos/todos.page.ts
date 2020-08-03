import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewTodoModalPage } from '../new-todo-modal/new-todo-modal.page';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  user;

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log("Logged in user detected...");
    });

  }

  async addTodo() {
    if(this.user == null) {
      this.router.navigate(["login"]);
    }

    // let modal = await this.modalCtrl.create({
    //   component: NewTodoModalPage,
    //   componentProps: {
    //     todo_owner: this.user.uid
    //   }
    // })

    // modal.present();
    this.router.navigate(["new-todo"]);
  }

}
