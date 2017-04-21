import { Component } from '@angular/core';

/**
 * Generated class for the AttendanceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'attendance',
  templateUrl: 'attendance.html'
})
export class AttendanceComponent {

  text: string;

  constructor() {
    console.log('Hello AttendanceComponent Component');
    this.text = 'Hello World';
  }

}
