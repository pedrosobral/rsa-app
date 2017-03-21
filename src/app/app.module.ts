import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {
  HomePage,
  PollPage,
} from '../pages/pages';

import { PollService } from '../providers/poll-service';

const pages = [
  MyApp,
  HomePage,
  PollPage,
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: provider(),
})
export class AppModule { }
