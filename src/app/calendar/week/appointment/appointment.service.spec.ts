import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from "rxjs/Observable";

import { RestApi } from "../../../shared/services/rest-api"
import { MaterialModule } from "../../../core/material-module";
import { AppointmentService } from './appointment.service';
import { Appointment } from "../shared/appointment";

describe('AppointmentService', () => {
  let appointmentService: AppointmentService;
  let event: Appointment = {
    "id": "595124c2da18e217f0fe1e78",
    "startTime": new Date("2017-06-26T09:30:00+00:00"),
    "endTime": new Date("2017-06-26T10:00:00+00:00"),
    "available": false,
    "day": 1
  };
  let mockBackend: MockBackend;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [AppointmentService, RestApi, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }]
    });
    mockBackend = TestBed.get(MockBackend);
    appointmentService = TestBed.get(AppointmentService);

  });

  it('should update and fetch updated appointment', inject([AppointmentService], (service: AppointmentService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'update');
    spyOn(service, 'sync');
    service.update(event);
    service.sync();
    expect(service.update).toHaveBeenCalled();
    expect(service.sync).toHaveBeenCalled();
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

});
