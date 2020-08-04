import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ToastController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-todo-modal",
  templateUrl: "./new-todo-modal.page.html",
  styleUrls: ["./new-todo-modal.page.scss"],
})
export class NewTodoModalPage implements OnInit {
  todo: any = {
    title: "Washing",
    description: "Monday is washing day!",
    date: new Date(),
  };

  user: any = {};

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log("Logged in user detected...");
    });
  }

  updateField(event, name) {
    if (name == "title") this.todo.title = event.target.value;
    if (name == "description") this.todo.description = event.target.value;
  }

  async create() {
    try {
      await firebase
        .firestore()
        .collection("todos")
        .add({
          todo_completed: false,
          todo_created: new Date(),
          todo_date: new Date(this.todo.date),
          todo_description: this.todo.description,
          todo_owner: this.user.uid,
          todo_title: this.todo.title,
        });

      let toast = await this.toastCtrl.create({
        message: "ToDo created successfully",
        duration: 3000,
      });

      await toast.present();

      // Dismiss the modal
      this.modalCtrl.dismiss();
    } catch (ex) {
      let toast = await this.toastCtrl.create({
        message: "ToDo creation failed. Try again.",
        duration: 3000,
      });
      toast.present();
    }
  }

  close() {
    //TODO
  }
}
