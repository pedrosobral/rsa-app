import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class PollPage extends Page {

  navigateToPage() {
    return this.navigateTo(browser.baseUrl + 'dashboard/tabs/t0/class/questions/nav/n8/list');
  }

  // selectQuestion(index) {
  //   return element.all(by.css('ion-item')).get(index + 1).click();
  // }
  //
  // startSession() {
  //   return element(by.buttonText('Iniciar sessão')).click();
  // }

  getLoginModal() {
    return element(by.buttonText('Fazer login'));
  }

  enterId(id) {
    return element(by.css('.alert-input')).sendKeys(id);
  }

  confirmId() {
    return element.all(by.css('.alert-button')).then((buttons) => {
      // CONFIRMAR
      buttons[1].click();
    });
  }

  cancelId() {
    return element.all(by.css('.alert-button')).then((buttons) => {
      // CANCEL BUTTON
      buttons[0].click();
    });
  }

  getWelcomeMessage() {
    return element(by.css('.welcome'));
  }
}
