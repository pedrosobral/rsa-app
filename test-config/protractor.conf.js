// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../e2e/**/*.e2e-spec.ts'
    // '../e2e/add-question.e2e-spec.ts',
    // '../e2e/poll.e2e-spec.ts',
    // '../e2e/student-login.e2e-spec.ts',
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:8100/#/nav/n4/',
  // baseUrl: 'https://rsa-beta-a263f.firebaseapp.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());

    browser.driver.get(browser.baseUrl + 'teacher/login');

    browser.driver.sleep(1000);

    browser.driver.findElement(by.css('#email > input')).sendKeys('jose@univasf.edu');
    browser.driver.findElement(by.css('#password > input')).sendKeys('123');
    browser.driver.findElement(by.id('login')).click();

    browser.waitForAngularEnabled(false);

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // /#/dashboard...
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /dashboard/.test(url);
      });
    }, 10000);
  }
};
