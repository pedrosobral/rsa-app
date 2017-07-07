import {
  Component,
  Input,
} from '@angular/core';

import {
  PopoverController,
} from 'ionic-angular';

@Component({
  selector: 'students-online',
  templateUrl: 'students-online.html'
})
export class StudentsOnlineComponent {
  @Input() room: any;

  constructor(
    public popCtrl: PopoverController,
  ) { }

  ngOnChanges(changes) {
    if (this.room && this.room.private) {
      this.room.people = this.room.students.filter(s => s.online).length;
    }
  }

  presentPopover(ev) {
    this.popCtrl.create('OnlineStudentsPage', { room: this.room }).present({ ev });
  }

}
