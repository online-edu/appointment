import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { RestApi } from "../../../shared/services/rest-api";
import { Appointment } from "../shared/appointment";

@Injectable()
export class AppointmentService {

  constructor(
    public snackBar: MdSnackBar,
    private restApi: RestApi) { }

  private appointment$ = new BehaviorSubject<Appointment>(new Appointment());

  add = (appointment: Appointment) => this.appointment$.next(appointment);

  sync = (): Observable<Appointment> => this.appointment$.asObservable();

  getAll = () => this.restApi.get('slots.json');

  notifyUser(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
    });
  }

}
