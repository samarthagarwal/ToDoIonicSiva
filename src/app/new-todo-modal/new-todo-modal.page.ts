import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-new-todo-modal',
  templateUrl: './new-todo-modal.page.html',
  styleUrls: ['./new-todo-modal.page.scss'],
})
export class NewTodoModalPage implements OnInit {

  todo: any = {
    title: "Washing",
    description: "Monday is washing day!",
    date: new Date()
  };

  user: any = {};

  constructor() { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log("Logged in user detected...");
    });

  }

  create() {

    firebase.firestore().collection("todos").add({
      "todo_completed": false,
      "todo_created": new Date(),
      "todo_date": new Date(this.todo.date),
      "todo_description": this.todo.description,
      "todo_owner": this.user.uid,
      "todo_title": this.todo.title
    });

  }

  close() {
    //TODO
  }

}
