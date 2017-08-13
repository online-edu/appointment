import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { MaterialModule } from "../../core/material-module";
import { WeekComponent } from './week.component';
import { DialogComponent } from "./dialog/dialog.component";
import { AppointmentService } from "./appointment/appointment.service";
import { PubnubService } from "../../shared/services/pubnub.service";
import { PubNubAngular } from "pubnub-angular2";
import { RestApi } from "../../shared/services/rest-api"
import { UtilService } from "./shared/util.service";
import { Day, Days } from "./day/day";
import { Appointment } from "./shared/appointment";

xdescribe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let appointmentService: AppointmentService;
  let pubnubService: PubnubService;
  let utilService: UtilService;
  let spy;
  let testAppointments = [
    {
      "id": "595124c2da18e217f0fe1e78",
      "startTime": "2017-06-26T09:30:00+00:00",
      "endTime": "2017-06-26T10:00:00+00:00",
      "available": false
    }];
  let testStyle = { 'height': '1px', 'top': '', 'background-color': '', 'border-color': '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeekComponent],
      imports: [MaterialModule],
      providers: [AppointmentService, PubnubService, UtilService, RestApi, PubNubAngular],
    }).compileComponents();

    //de = fixture.debugElement.query(By.css('.week'));
    //el = de.nativeElement;
    fixture = TestBed.createComponent(WeekComponent);
    appointmentService = fixture.debugElement.injector.get(AppointmentService);
    pubnubService = fixture.debugElement.injector.get(PubnubService);
    utilService = fixture.debugElement.injector.get(UtilService);

    spy = spyOn(appointmentService, 'getAll')
      .and.returnValue(Observable.of(testAppointments));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    const fixture = TestBed.createComponent(WeekComponent);
    const week = fixture.debugElement.componentInstance;
    expect(week).toBeTruthy();
  });

  // it('should fetch days and hours', async(() => {
  //   expect(component.days).toEqual(['Monday 26', 'Tuesday 27', 'Wednesday 28', 'Thursday 29', 'Friday 30', 'Saturday 1', 'Sunday 2']);
  //   expect(component.hours).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  // }));

  // it('should initate PubNub connection and subscribe', async(() => {
  //   expect(pubnubService.init()).toHaveBeenCalled();
  //   expect(pubnubService.subscribe()).toHaveBeenCalled();
  // }));

  // it('should not show appointments before OnInit', () => {
  //   expect(el.textContent).toBe('', 'nothing displayed');
  //   expect(spy.calls.any()).toBe(false, 'getAll() not yet called');
  // });

  // it('should show appointments after getAll observable (async)', async(() => {
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => { // wait for async getQuote
  //     fixture.detectChanges();        // update view with quote
  //     expect(component.appointments).toBe(testAppointments);
  //   });
  // }));


  // it('should set style for appointment', async(() => {
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => { // wait for async getQuote
  //     fixture.detectChanges();        // update view with quote
  //     expect(utilService.style(testAppointments[0])).toEqual(testStyle);
  //   });
  // }));

  // it('should return Observable on event updates', async(() => {
  //   expect(appointmentService.sync()).toBe(Observable)
  // }));

});
