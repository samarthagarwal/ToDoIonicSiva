import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { NewTodoModalPage } from '../new-todo-modal/new-todo-modal.page';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  user;
  todos: any[] = [];

  constructor(private router: Router, private modalCtrl: ModalController, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.user = user;
        console.log("Logged in user detected...");
        this.getTodos();
        this.registerForPush(this.user.uid)
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }

  registerForPush(uid: string) {

    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        alert("Permission denied!");
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      async (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);

        await firebase.firestore().collection("users").doc(uid).set({
          "uid": uid,
          "last_updated": new Date(),
          "token": token.value
        });

      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  async getTodos() {

    let loading = await this.loadingCtrl.create({
      message: "Fetching todos, please wait...",
      spinner: "dots"
    });

    await loading.present();

    let data = await firebase.firestore().collection("todos")
    .orderBy("todo_date", "asc")
    .where("todo_owner", "==", this.user.uid)
    .get();

    this.todos = [];
    for (let index = 0; index < data.docs.length; index++) {
      
      this.todos.push(data.docs[index]);
      
    }

    console.log(this.todos);

    loading.dismiss();
  }

  async markAsDone(todo: any) {

    let loading = await this.loadingCtrl.create({
      message: "Marking as done, please wait...",
      spinner: "dots"
    });

    await loading.present();

    let oldValue: boolean = todo.data().todo_completed;

    await firebase.firestore().collection("todos").doc(todo.id).update({
      "todo_completed": !oldValue,
    })
    
    loading.dismiss();

    //Refresh the list 
    this.getTodos();
  }

  async delete(todo: any) {

    let loading = await this.loadingCtrl.create({
      message: "Deleting, please wait...",
      spinner: "dots"
    });

    await loading.present();

    await firebase.firestore().collection("todos").doc(todo.id).delete();
    
    loading.dismiss();

    //Refresh the list 
    this.getTodos();
  }

  async addTodo() {
    if(this.user == null) {
      this.router.navigate(["login"]);
    }

    let modal = await this.modalCtrl.create({
      component: NewTodoModalPage,
      componentProps: {
        todo_owner: this.user.uid
      }
    })

    modal.onDidDismiss().then((data) => {
      // Refresh the list
      this.getTodos()
    })

    modal.present();
    // this.router.navigate(["new-todo"]);
  }

  async logout() {
    
    await firebase.firestore().collection("users").doc(this.user.uid).update({
      "last_updated": new Date(),
      "token": ""
    });
    await firebase.auth().signOut();
  }

}
