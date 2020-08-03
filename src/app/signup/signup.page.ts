import { Component, OnInit } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";

import * as firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  user: any = {};

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  ngOnInit() {}

  async signup() {
    if (
      this.user.name == null ||
      this.user.email == null ||
      this.user.password == null ||
      this.user.confirmPassword == null
    ) {
      let toast = await this.toastCtrl.create({
        message: "Please fill out all the fields",
        duration: 5000,
      });

      toast.present();
      return;
    }

    if (this.user.password != this.user.confirmPassword) {
      let toast = await this.toastCtrl.create({
        message: "Please check the passwords",
        duration: 5000,
      });

      toast.present();
      return;
    }

    console.log("Proceeding with sign up, all okay!");

    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      spinner: "dots"
    });

    try {

      loading.present();
      let user = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password);

      await user.user.updateProfile({
        displayName: this.user.name
      })

      let toast = await this.toastCtrl.create({
        message: "Your account has been created!",
        duration: 3000,
      });
      toast.present();

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
