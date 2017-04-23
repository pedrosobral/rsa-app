import { Component } from '@angular/core';

import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

import {
  AttendanceProvider,
} from '../../providers/providers';


@IonicPage({
  segment: 'activities'
})
@Component({
  selector: 'page-professor-attendance-list',
  templateUrl: 'professor-attendance-list.html',
})
export class ProfessorAttendanceListPage {
  room = this.navParams.get('room');

  attendances: any;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public attendanceProvider: AttendanceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.initAttendance();
  }

  initAttendance() {
    this.attendanceProvider
      .all(this.room)
      .subscribe((result) => {
        this.attendances = result.data;

        this.setStats();
      });
  }

  setStats() {
    this.attendances.forEach((att) => {
      att.presents = att.students.filter(x => x.present).length;
      att.abscents = att.students.length - att.presents;
      att.overall = Math.round(att.presents/att.students.length * 100);
    });
  }

  edit(attendance) {
    this.navCtrl.push('ProfessorAttendanceDetailsPage', { attendance });
  }

  remove(attendance) {
    this.attendanceProvider
      .remove(attendance)
      .then(() => {
        this.presentToast('Mudança salva');
      });
  }

  askToRemove(attendance) {
    let confirm = this.alertCtrl.create({
      title: 'Remover registro de frequêcia?',
      message: 'Essa operação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.presentToast('Remoção cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.remove(attendance);
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(msg) {
    return this.toastCtrl.create({
      duration: 3000,
      message: msg,
    }).present();
  }

}
