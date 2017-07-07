import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class ProfessorQuestions extends Page {

  navigateToPage() {
    return this.navigateTo(browser.baseUrl + 'dashboard/tabs/t0/class/questions/nav/n8/list');
  }

  selectQuestion(index) {
    return element.all(by.css('ion-item')).get(index + 1).click();
  }

  startSession() {
    return element(by.buttonText('Iniciar sessão')).click();
  }
}
