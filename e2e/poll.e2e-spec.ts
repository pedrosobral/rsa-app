import { browser, element, by, ElementFinder, protractor } from 'protractor';

import { Page, PollPage, ProfessorLive, ProfessorQuestions } from './pages/pages';

describe('Poll Page', () => {
  let poll: PollPage;
  let questionsPage: ProfessorQuestions;

  beforeEach(() => {
    poll = new PollPage();
    questionsPage = new ProfessorQuestions();
  });

  it('should change tab when starts a new session', () => {
    browser.sleep(1000);

    poll.navigateToPage();

    browser.sleep(1000);

    // select one question
    questionsPage.selectQuestion(0);

    questionsPage.startSession();

    browser.sleep(2000);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual(browser.baseUrl + 'dashboard/tabs/t0/live/polls');
    });
  });

  it('student should be able to answer', () => {
    const studentBrowser = browser.forkNewDriverInstance();

    const byStudent = studentBrowser.$;
    var element2 = studentBrowser.element;
    var $2 = studentBrowser.$;
    var $$2 = studentBrowser.$$;

    studentBrowser.get(browser.baseUrl + 'poll/ENGSOFT123')
      .then(() => {
        studentBrowser.driver.sleep(1000);
        studentBrowser.waitForAngularEnabled(false);

        element2(by.css('.alert-input')).sendKeys(101);

        studentBrowser.driver.sleep(1000);

        element2.all(by.css('.alert-button')).then((buttons) => {
          // CONFIRMAR
          buttons[1].click();
        });

        browser.sleep(1000);

        browser.element(by.css('button[id="play-button"]')).click();

        browser.sleep(1000);

        element2(by.css('ion-item')).click();

        studentBrowser.driver.sleep(1000);

        element2(by.buttonText('ENVIAR')).click();

        studentBrowser.driver.sleep(1000);

        // should count number of votes to 1
        browser.element(by.css('.number-votes')).getText()
          .then(text => {
            expect(text).toEqual('1');

            // end session button
            browser.element(by.css('button[id="end-button"]')).click();
          });
      });
  });
})
