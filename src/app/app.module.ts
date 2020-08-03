import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyA6QGBncOwfFQQ2EzyotJLB9k9ECcxb12I",
  authDomain: "ionictodo-fdc2d.firebaseapp.com",
  databaseURL: "https://ionictodo-fdc2d.firebaseio.com",
  projectId: "ionictodo-fdc2d",
  storageBucket: "ionictodo-fdc2d.appspot.com",
  messagingSenderId: "626681402232",
  appId: "1:626681402232:web:683331f5a521288c846e8d"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
