import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class HomePage extends Page {

  joinButton : ElementFinder;

  constructor() {
    super();

    this.joinButton = element(by.css('#join-button > div.item-inner > button'));
  }

  navigateToPage() {
    return this.navigateTo('home');
  }

  digitCode(code) {
    return element(by.css('.text-input')).sendKeys(code);
  }

  joinFromHistory() {
    return element.all(by.css('log-access button'));
  }

  joinRoom(code) {
    return this.digitCode(code).then(() => {
      return this.joinButton.click();
    });
  }

}
