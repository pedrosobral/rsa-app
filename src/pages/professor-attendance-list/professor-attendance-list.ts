import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
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

}
