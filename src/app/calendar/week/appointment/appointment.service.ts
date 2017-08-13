import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { RestApi } from "../../../shared/services/rest-api";
import { Appointment } from "../shared/appointment";
/**
 * Manages appointments operations.
 *
 * `AppointmentService` is available as an injectable class, with various methods.
 */
@Injectable()
export class AppointmentService {
  private appointment$ = new BehaviorSubject<Appointment>(new Appointment());

  constructor(public snackBar: MdSnackBar) { }
  /**
  * Updates view for new subscriptions modifications.
  */
  update = (appointment: Appointment) => this.appointment$.next(appointment);
  /**
  * Observes active user's subscription for new messages.
  */
  sync = (): Observable<Appointment> => this.appointment$.asObservable();
  /**
  * Notifies user on specific activity.
  */
  notifyUser(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
    });
  }
}
