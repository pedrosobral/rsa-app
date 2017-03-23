import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-professor-live',
  templateUrl: 'professor-live.html'
})
export class ProfessorLivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorLivePage');
  }

}
