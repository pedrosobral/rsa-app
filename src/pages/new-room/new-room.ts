import { Component } from '@angular/core';
import {
  IonicPage,
  NavParams,
  ViewController,
} from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  RoomsProvider,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-new-room',
  templateUrl: 'new-room.html',
})
export class NewRoomPage {
  form: FormGroup;

  isCodeTaken: boolean = false;

  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public rs: RoomsProvider,
    public viewCtrl: ViewController,
  ) {
    this.initForm();
  }

  ionViewDidLoad() { }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      // default: [false, Validators.required]
    });
  }

  submit() {
    // clear warnings
    this.isCodeTaken = false;

    // uuper case code string
    this.form.value.code = this.form.value.code.toUpperCase();

    this.rs.create(this.form.value)
      .then(() => this.close())
      .catch((error) => {
        this.isCodeTaken = true;
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
