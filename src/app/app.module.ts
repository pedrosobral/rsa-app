import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';

import {
  FeathersProvider,
  PollService,
  QuestionService,
  LabelService,
  RoomsProvider,
  AuthProvider,
  UsersProvider,
  AttendanceProvider,
} from '../providers/providers';

const listProviders = [
  FeathersProvider,
  PollService,
  QuestionService,
  LabelService,
  RoomsProvider,
  AuthProvider,
  UsersProvider,
  AttendanceProvider,

  SplashScreen,
  {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }
];

export function provider() {
  return listProviders;
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: provider(),
})
export class AppModule { }
