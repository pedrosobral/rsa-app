import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';

import {
  HomePage,
  PollPage,
  ProfessorTabsPage,
  ProfessorQuestionsPage,
  ProfessorNewQuestionPage,
  ProfessorLivePage,
} from '../pages/pages';

import {
  PollService,
  QuestionService,
} from '../providers/providers';

const pages = [
  MyApp,
  HomePage,
  PollPage,
  ProfessorTabsPage,
  ProfessorQuestionsPage,
  ProfessorNewQuestionPage,
  ProfessorLivePage,
];

const components = [];

export function declarations() {
  return [components, pages];
}

export function entryComponents() {
  return pages;
}

const listProviders = [
  PollService,
  QuestionService,

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
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: provider(),
})
export class AppModule { }
