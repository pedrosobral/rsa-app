import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'log-access',
  templateUrl: 'log-access.html'
})
export class LogAccessComponent {
  @Input() log: any;

  @Output() goTo = new EventEmitter();

  constructor() { }

  goToPoll(room) {
    this.goTo.emit(room);
  }

}
