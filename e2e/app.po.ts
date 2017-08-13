import {
  browser, element, by, promise,
  ElementFinder, ElementArrayFinder
} from 'protractor';

export class Appointment {
  navigateTo() {
    return browser.get('/');
  }

  getContainer(): ElementFinder {
    return element(by.css('app-root'));
  }

  getNav(): ElementFinder {
    return this.getContainer().element(by.css('.mat-toolbar-layout'));
  }

  getTitle() {
    return this.getNav().element(by.css('span')).getText();
  }

}
