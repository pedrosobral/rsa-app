import { Component, Input } from '@angular/core';

@Component({
  selector: 'attendance',
  templateUrl: 'attendance.html'
})
export class AttendanceComponent {
  @Input('attendance') attendance: any;

  constructor() { }

}
