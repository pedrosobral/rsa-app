import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class ProfessorLive extends Page {

  navigateToPage() {
    return this.navigateTo('#/dashboard/class/questions/list');
  }

  enablePoll() {
    // return element(by.id('play-button')).click();
  }
}
