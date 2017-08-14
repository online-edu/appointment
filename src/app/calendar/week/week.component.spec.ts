import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from "rxjs/Observable";

import { RestApi } from "../../shared/services/rest-api"
import { MaterialModule } from "../../core/material-module";
import { LoggerService } from "../../core/logger.service";
import { WeekComponent } from './week.component';
import { DialogComponent } from "./dialog/dialog.component";
import { AppointmentService } from "./appointment/appointment.service";
import { PubnubService } from "../../shared/services/pubnub.service";
import { PubNubAngular } from "pubnub-angular2";
import { UtilService } from "./shared/util.service";
import { Day, Days } from "./day/day";
import { Appointment } from "./shared/appointment";

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let appointmentService: AppointmentService;
  let pubnubService: PubnubService;
  let utilService: UtilService;
  let spy;
  let mockBackend: MockBackend;
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
      providers: [AppointmentService, PubnubService, UtilService, PubNubAngular, RestApi, LoggerService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }],
    }).compileComponents();
    mockBackend = TestBed.get(MockBackend);
    appointmentService = TestBed.get(AppointmentService);

    spy = spyOn(appointmentService, 'getAll')
      .and.returnValue(Observable.of(testAppointments));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    const week = fixture.debugElement.componentInstance;
    expect(week).toBeTruthy();
  });

  it('should inject appointmentService, pubnubService and utilService', () => {
    fixture = TestBed.createComponent(WeekComponent);
    appointmentService = fixture.debugElement.injector.get(AppointmentService);
    pubnubService = fixture.debugElement.injector.get(PubnubService);
    utilService = fixture.debugElement.injector.get(UtilService);
    expect(appointmentService).toBeDefined();
    expect(pubnubService).toBeDefined();
    expect(utilService).toBeDefined();
  });


  it('should fetch days and hours', async(() => {
    expect(component.days).toEqual(['Monday 26', 'Tuesday 27', 'Wednesday 28', 'Thursday 29', 'Friday 30', 'Saturday 1', 'Sunday 2']);
    expect(component.hours).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  }));

  it('should initate PubNub connection and subscribe', async(() => {
    expect(pubnubService).toBeTruthy();
    spyOn(pubnubService, 'init');
    pubnubService.init();
    expect(pubnubService.init).toHaveBeenCalled();
    spyOn(pubnubService, 'subscribe');
    pubnubService.subscribe();
    expect(pubnubService.init).toHaveBeenCalled();
  }));

  it('should get all appointments',
    async(inject([RestApi], (restService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  id: 26
                }]
            }
            )));
        });
      restService.get('slots.json').subscribe(
        (appointment) => {
          expect(appointment.length).toBeDefined();
        });
    })));

  it('should set style for appointment', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(utilService.style(testAppointments[0])).toEqual(testStyle);
    });
  }));

});
