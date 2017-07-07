import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LogAccessProvider } from '../../providers/providers';

@Component({
  selector: 'log-access',
  templateUrl: 'log-access.html'
})
export class LogAccessComponent {
  @Input() log: any;

  @Output() goTo = new EventEmitter();

  constructor(public logAccess: LogAccessProvider) { }

  goToPoll(room) {
    this.goTo.emit(room)
  }

  clear() {
    this.logAccess.clear()
      .then(() => this.log = [])
  }

}
