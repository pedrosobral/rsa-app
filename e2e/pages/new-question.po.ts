import { browser, element, by, ElementFinder } from 'protractor';

export class NewQuestionPage {
  setQuestionInput(question) {
    return element(by.css('input[formControlName="question"]')).sendKeys(question);
  }

  addAlternative() {
    element(by.buttonText('Adicionar Alternativa')).click();
  }

  setAlternativeText(index, text) {
    return element(by.css(`input[placeholder="Alternativa ${index}"]`)).sendKeys(text);
  }

  cancel() {
    element(by.buttonText('Cancelar')).click();
  }

  setTrueOrFalseQuestionType() {
    return element.all(by.css('.item-radio')).get(1).click();
  }

  selectCorrectAlternative() {
    return element(by.css('ion-radio[ng-reflect-value="0"]')).click();
  }

  save() {
    return element(by.buttonText('Concluído'));
  }

}
