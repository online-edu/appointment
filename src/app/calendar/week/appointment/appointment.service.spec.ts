import { TestBed, inject } from '@angular/core/testing';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [AppointmentService]
    });
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
  
});
