import { browser, element, by, ElementFinder, protractor } from 'protractor';

import { HomePage, Page, PollPage } from './pages/pages';

describe('Home Page', () => {
  let page: Page;
  let home: HomePage;
  let poll: PollPage;

  beforeEach(() => {
    page = new Page();
    home = new HomePage();
    poll = new PollPage();
  });

  describe('Student Login', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('join button should be disabled', () => {
      expect(home.joinButton.isEnabled()).toBeFalsy();
    });

    it('should go to votes page with title that contains #ENGSOFT123', () => {
      home.joinRoom('ENGSOFT123');

      browser.driver.sleep(2000);
      browser.waitForAngularEnabled(false);

      browser.driver.wait(() => {
        return poll.getLoginModal().isDisplayed();
      });

      poll.enterId('101');
      poll.confirmId();

      browser.driver.sleep(1000);

      expect(poll.getWelcomeMessage().getText()).toContain(', bem vindo');
    });

    it('should have a history of early access', () => {
      browser.driver.sleep(500);
      expect(home.joinFromHistory().count()).toBeGreaterThan(1);
    });

    it('should join #ENGSOFT123 from early access', () => {
      browser.driver.sleep(500);

      // first button is clear history
      // from second is the history itself
      home.joinFromHistory().get(1).click();

      browser.driver.sleep(500);
      browser.waitForAngularEnabled(false);

      page.getTitle().then(title => {
        expect(title).toEqual('#ENGSOFT123');
      });
    })

    it('should come back to home page when student cancels', () => {
      home.joinRoom('ENGSOFT123');

      browser.driver.sleep(2000);
      browser.waitForAngularEnabled(false);

      poll.cancelId();

      browser.driver.sleep(1000);

      browser.getCurrentUrl().then(url => {
        expect(url).toEqual(browser.baseUrl + 'home');
      });
    });

    it('should come back to home page with inexisted room code', () => {
      home.joinRoom('*#123');

      browser.driver.sleep(1000);
      browser.waitForAngularEnabled(false);
      browser.driver.sleep(500);

      browser.getCurrentUrl().then(url => {
        expect(url).toEqual(browser.baseUrl + 'home');
      });
    });
  })
});
