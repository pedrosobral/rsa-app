import { browser, element, by, ElementFinder } from 'protractor';

import { NewQuestionPage, QuestionsTab } from './pages/pages';

describe('Questions Tab', () => {
  let questionsTab: QuestionsTab;

  beforeEach(() => {
    questionsTab = new QuestionsTab();
  });

  describe('add new questions', () => {

    it('should open new question form', () => {
      questionsTab.navigateToPage();
      browser.refresh().then(() => {
        questionsTab.sleep(1000);

        questionsTab.getAddQuestionButton().click();
        questionsTab.sleep();

        expect(questionsTab.getModalAddQuestion().isDisplayed()).toBeTruthy();
      })
    });

    it('should add true or false question', () => {
      let form = new NewQuestionPage();
      form.setQuestionInput('To be or not to be');

      form.setTrueOrFalseQuestionType();

      browser.driver.sleep(500);

      form.selectCorrectAlternative();

      form.save().click();

      browser.driver.sleep(2000);

      questionsTab.getNumQuestions()
        .then(questions => {
          expect(questions).toEqual(questionsTab.questions + 1);
        });
    });

    it('should not allow mc question without correct option', () => {
      questionsTab.getAddQuestionButton().click();
      questionsTab.sleep();

      const form = new NewQuestionPage();
      form.setQuestionInput('To be or not to be');

      form.addAlternative();
      form.addAlternative();

      form.setAlternativeText(0, 'TO BE');
      form.setAlternativeText(1, 'NOT TO BE');

      expect(form.save().isEnabled()).toBeFalsy();

      form.cancel();
    });

    it('should not allow mc question with one option', () => {
      // questionsTab.navigateToPage();
      // browser.refresh().then(() => {

        questionsTab.sleep(1000);
        questionsTab.getAddQuestionButton().click();
        questionsTab.sleep();

        const form = new NewQuestionPage();
        form.setQuestionInput('To be or not to be');

        form.addAlternative();
        form.setAlternativeText(0, 'TO BE');

        expect(form.save().isEnabled()).toBeFalsy();

        form.cancel();
      // })
    })
  });
});
