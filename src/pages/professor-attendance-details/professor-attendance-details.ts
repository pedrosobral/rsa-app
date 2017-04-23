import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

import {
  AttendanceProvider,
} from '../../providers/providers';

@IonicPage({
  segment: 'details',
})
@Component({
  selector: 'page-professor-attendance-details',
  templateUrl: 'professor-attendance-details.html',
})
export class ProfessorAttendanceDetailsPage {
  attendance: any;

  constructor(
    public toastCtrl: ToastController,
    public attendanceProvider: AttendanceProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.load();
  }

  load(toast = false) {
    const attendance = this.navParams.get('attendance');
    this.attendanceProvider
      .get(attendance._id)
      .then((result) => {
        this.attendance = result;

        this.setStats();

        toast && this.presentToast('Mudança salva');
      });
  }

  setStats() {
    this.attendance.presents = this.attendance.students.filter(x => x.present).length;
    this.attendance.abscents = this.attendance.students.length - this.attendance.presents;
    this.attendance.overall = Math.round(this.attendance.presents / this.attendance.students.length * 100);
  }

  changePresence(student, value) {
    this.attendanceProvider
      .setAttendance(this.attendance, student, value)
      .then(() => {
        const showToast = true;
        this.load(showToast);
      });
  }

  presentToast(msg) {
    return this.toastCtrl.create({
      duration: 3000,
      message: msg,
    }).present();
  }

}
