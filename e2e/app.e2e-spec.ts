import { Appointment } from './app.po';
import { Calendar } from './calendar.po';

describe('appointment-app App', () => {
  let pageApp: Appointment, pageCal: Calendar;

  beforeEach(() => {
    pageApp = new Appointment();
    pageCal = new Calendar();
  });

  it('should find toolbar', () => {
    pageApp.navigateTo();
    let title = pageApp.getTitle();
    expect(title).toEqual('Calendar');
  });

  it('should find the calender', () => {
    pageCal.navigateTo();
    let content = pageCal.getInnerContent();
    expect(content).not.toBeNull();
  })

});
