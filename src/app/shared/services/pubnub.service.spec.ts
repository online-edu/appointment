import { TestBed, inject } from '@angular/core/testing';

import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RestApi } from "./rest-api";
import { MdSnackBar } from "@angular/material";
import { PubnubService } from './pubnub.service';
import { PubNubAngular } from "pubnub-angular2";
import { AppointmentService } from "../../calendar/week/appointment/appointment.service";
import { MaterialModule } from "../../core/material-module";
import { LoggerService } from "../../core/logger.service";

describe('PubnubService', () => {
  let pubnubService: PubnubService;
  let message = {
    "id": "595124c2da18e217f0fe1e78",
    "startTime": "2017-06-26T09:30:00+00:00",
    "endTime": "2017-06-26T10:00:00+00:00",
    "available": false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        PubnubService,
        PubNubAngular,
        AppointmentService,
        LoggerService,
        RestApi, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    pubnubService = TestBed.get(PubNubAngular);
  });

  it('should init connection', inject([PubnubService], (service: PubnubService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'init');
    service.init();
    expect(service.init).toHaveBeenCalled();
  }));

  it('should subscribe user', inject([PubnubService], (service: PubnubService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'subscribe');
    service.subscribe();
    expect(service.subscribe).toHaveBeenCalled();
  }));

  it('should publish message and notify user', inject([PubnubService], (service: PubnubService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'publish');
    spyOn(service, 'notify');
    service.publish(message)
    expect(service.publish).toHaveBeenCalled();
  }));

  it('should unsubscribe connection', inject([PubnubService], (service: PubnubService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'unSubscribe');
    service.unSubscribe(false);
    expect(service.unSubscribe).toHaveBeenCalled();
  }));

  it('should unsubscribe all connections', inject([PubnubService], (service: PubnubService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'unSubscribe');
    service.unSubscribe(true);
    expect(service.unSubscribe).toHaveBeenCalled();
  }));

});
