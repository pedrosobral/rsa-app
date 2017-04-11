import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfessorTabsPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'HomePage';

  constructor(public platform: Platform , public splash: SplashScreen ) {
    platform.ready().then(() => {
      splash.hide();
    });
  }
}
