import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import * as _ from "lodash";

import { DialogComponent } from "./dialog/dialog.component";
import { AppointmentService } from "./appointment/appointment.service";
import { PubnubService } from "../../shared/services/pubnub.service";
import { UtilService as Util } from "./shared/util.service";
import { Day, Days } from "./day/day";
import { Appointment } from "./shared/appointment";

const ACTION = "Okay";
const NOT_AVAIBLE = "That slot is not available. We are sorry for inconvenience!";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  providers: [PubnubService, AppointmentService, Util]
})
export class WeekComponent implements OnInit {
  days = Days.all();
  hours = this.util.getHours(24);
  day: Days = new Days();
  appointments;

  constructor(public dialog: MdDialog,
    private pubNub: PubnubService,
    private util: Util,
    private appointment: AppointmentService) {
    this.pubNub.init();
    this.pubNub.subscribe();
    this.appointment.sync().subscribe(appointment => {
      let tempAppointment: any = appointment;
      if (tempAppointment.message) {
        this.updateAppointments(tempAppointment.message.day, tempAppointment.message, true)
      }
    })
  }

  ngOnInit() {
    this.appointment.getAll().
      subscribe(appointments => {
        this.appointments = appointments;
        this.init();
      });
  }

  ngOnDestroy() {
    this.pubNub.unSubscribe(true);
  }

  getStyle = (event: Appointment) => this.util.style(event);

  onEventClick = (event: Appointment) => (event.available) ? this.createAppointment(event) : this.appointment.notifyUser(NOT_AVAIBLE, ACTION);

  private createAppointment(event: Appointment) {
    let dialogRef = this.dialog.open(DialogComponent, this.util.dialogConfig(event));
    dialogRef.afterClosed().subscribe(result => {
      let appointment: Appointment = dialogRef.componentInstance.currentEvent;
      if (dialogRef.componentInstance.appointment.valid) {
        this.pubNub.publish(appointment);
      }
    });
  }

  private updateAppointments(day: number, appointment: Appointment[] | Appointment | any, update: boolean = false) {
    switch (day) {
      case Day.MON:
        if (update) {
          let i = this.util.findIndex(this.day.monday, appointment.id);
          this.day.monday[i] = appointment;
        }
        else
          this.day.monday = appointment;
        break;

      case Day.TUE:
        if (update) {
          let i = this.util.findIndex(this.day.tuesday, appointment.id);
          this.day.tuesday[i] = appointment;
        }
        else
          this.day.tuesday = appointment;        
        break;

      case Day.WED:
        if (update) {
          let i = this.util.findIndex(this.day.wednesday, appointment.id);
          this.day.wednesday[i] = appointment;
        }
        else
          this.day.wednesday = appointment;        
        break;

      case Day.THU:
        if (update) {
          let i = this.util.findIndex(this.day.thursday, appointment.id);
          this.day.thursday[i] = appointment;
        }
        else
          this.day.thursday = appointment;        
        break;

      case Day.FRI:
        if (update) {
          let i = this.util.findIndex(this.day.friday, appointment.id);
          this.day.friday[i] = appointment;
        }
        else
          this.day.friday = appointment;        
        break;

      case Day.SAT:
        if (update) {
          let i = this.util.findIndex(this.day.saturday, appointment.id);
          this.day.saturday[i] = appointment;
        }
        else
          this.day.saturday = appointment;
        break;

      case Day.SUN:
        if (update) {
          let i = this.util.findIndex(this.day.sunday, appointment.id);
          this.day.sunday[i] = appointment;
        }
        else
          this.day.sunday = appointment;        
        break;
    }
  }

  init() {
    let appointmentsByDate: any = this.util.groupByDate(this.appointments);
    _.forEach(appointmentsByDate, appointment => {
      let tempAppointment: any = _.first(appointment);
      this.updateAppointments(parseInt(tempAppointment.day), appointment);
    });
  }
}
