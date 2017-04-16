import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';

import {
  PollService,
  QuestionService,
  LabelService,
  RoomsProvider,
} from '../providers/providers';

const listProviders = [
  PollService,
  QuestionService,
  LabelService,
  RoomsProvider,

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
