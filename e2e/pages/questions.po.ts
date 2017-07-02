import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './pages';

export class QuestionsTab extends Page {

  questions: number;

  constructor() {
    super();

    this.sleep();
    this.getNumQuestions().then(questions => {
      this.questions = questions;
    });
  }

  navigateToPage() {
    return this.navigateTo('/#/dashboard/class/questions/list');
  }

  getAddQuestionButton() {
    return element(by.cssContainingText('.button', 'Adicionar questão'));
  }

  getModalAddQuestion() {
    return element(by.tagName('page-professor-new-question'));
  }

  getNumQuestions() {
    return element.all(by.css('page-professor-questions > ion-content > div.scroll-content > ion-list > ion-item')).count();
  }

}
