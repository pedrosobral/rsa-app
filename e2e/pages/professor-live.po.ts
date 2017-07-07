import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class ProfessorLive extends Page {

  navigateToPage() {
    return this.navigateTo(browser.baseUrl + 'dashboard/tabs/t0/class/questions/nav/n8/list');
  }

  enablePoll() {
    // return element(by.id('play-button')).click();
  }
}
