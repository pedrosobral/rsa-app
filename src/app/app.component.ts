import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import 'moment/locale/pt-br';

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
