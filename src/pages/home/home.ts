import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PollService } from '../../providers/poll-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public ps: PollService, public navCtrl: NavController) { }
}
