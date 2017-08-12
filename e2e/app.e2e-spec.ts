import { AppointmentAppPage } from './app.po';

describe('appointment-app App', () => {
  let page: AppointmentAppPage;

  beforeEach(() => {
    page = new AppointmentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
