import { Component, Input, ViewChild } from '@angular/core';

import { Checkbox } from 'ionic-angular';

@Component({
  selector: 'tristate-label',
  templateUrl: 'tristate-label.html'
})
export class TristateLabelComponent {
  @ViewChild('checkbox') checkbox: Checkbox;

  @Input() label: any;

  constructor() { }

  onClick() {
    // previously checked
    if (!this.label.isChecked) {
      if (this.label.isAppliedToAllQuestions) {
        this.label.isChecked = false;
        this.label.isAppliedToAllQuestions = false;
      } else {
        this.label.isChecked = true;
        this.checkbox.checked = true;
        this.label.isAppliedToAllQuestions = true;
      }
    } else {
      this.label.isAppliedToAllQuestions = true;
    }
  }

}
