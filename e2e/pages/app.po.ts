import { browser } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  refresh() {
    return browser.refresh();
  }

  sleep(time = 800) {
    return browser.driver.sleep(time);
  }

}
