import { Component, Input } from '@angular/core';

@Component({
  selector: 'attendance',
  templateUrl: 'attendance.html'
})
export class AttendanceComponent {
  @Input('attendance') attendance: any;
  @Input('info') info: any;

  constructor() { }

  showUp(students) {
    const count = students && students.filter(x => x.present).length;
    return !count ?
      'Esperando...'
      : count === 1 ?
      '1 aluno presente'
      : count + ' alunos presentes';
  }

}
