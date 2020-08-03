import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {};

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private router: Router) {}

  ngOnInit() {}

  async login() {
    if (
      this.user.email == null ||
      this.user.password == null
    ) {
      let toast = await this.toastCtrl.create({
        message: "Please fill out all the fields",
        duration: 5000,
      });

      toast.present();
      return;
    }

    console.log("Proceeding with login, all okay!");

    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      spinner: "dots"
    });

    try {

      loading.present();
      let user = await firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password);

      let toast = await this.toastCtrl.create({
        message: "You have been logged in!",
        duration: 3000,
      });
      toast.present();

      this.router.navigate(['todos']);

    } catch (ex) {
      let toast = await this.toastCtrl.create({
        message: ex.message,
        duration: 5000,
      });
      toast.present();
      
      console.log(ex);
    } finally {
      loading.dismiss();
    }
  }

}
