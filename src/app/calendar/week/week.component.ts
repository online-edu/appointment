import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import * as _ from "lodash";
import * as moment from 'moment';

import { Day, Days } from "./day/day";
import { DialogComponent } from "./dialog/dialog.component";
import { AppointmentService } from "./appointment/appointment.service";
import { PubnubService } from "../../shared/services/pubnub.service";
import { Appointment } from "./shared/appointment";



@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  providers: [PubnubService, AppointmentService]
})
export class WeekComponent implements OnInit {
  days = ['Monday 26', 'Tuesday 27', 'Wednesday 28', 'Thursday 29', 'Friday 30', 'Saturday 1', 'Sunday 2'];
  hours = Array.from(new Array(24), (x, i) => i);
  day: Days = new Days();
  appointments;

  constructor(public dialog: MdDialog,
    private pubNub: PubnubService,
    private appointment: AppointmentService) {
    this.pubNub.init();
    this.pubNub.subscribe();

    this.appointment.sync().subscribe(appointment => {
      let tempAppointment: any = appointment;
      if (tempAppointment.message) {
        this.updateAppointment(tempAppointment.message.day, tempAppointment.message, true)
        console.log(tempAppointment.message);
      }
    })
  }

  getStyle(event) {
    const hourlyHeight = 95, topPosition = 100.5;
    let diff = this.meetingDuration(event.startTime, event.endTime);
    let hhmm: any = moment(event.startTime).format('HH:mm').split(':');
    let top = ((hhmm[1] == 0) ? hhmm[0] * topPosition : (hhmm[0] * topPosition) + 45) + 'px';
    let height = (diff % 1 != 0) ? diff * hourlyHeight : diff * hourlyHeight;
    let color = event.available ? '#3F51B5' : '#ff4081';
    // let height, lineHeight;
    // if (diff % 1 != 0) {
    //   height = diff * hourlyHeight - 10
    //   lineHeight = 2.5;
    // }
    // else {
    //   lineHeight = 6;
    //   height = diff * hourlyHeight;
    // }
    height = (height > 2415) ? 2415 : height;
    return { 'height': height + 'px', 'top': top, 'background-color': color, 'border-color': color };
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

  onEventClick(event) {
    (event.available) ? this.createAppointment(event) : this.appointment.notifyUser("That slot is not available. We are sorry for inconvenience!", "Okay");
  }

  private createAppointment(event) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: event,
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      let appointment: Appointment = dialogRef.componentInstance.currentEvent;
      if (dialogRef.componentInstance.appointment.valid) {
        this.pubNub.publish(appointment);
      }
    });
  }

  private updateAppointment(day: number, appointment: Appointment[] | any, add: boolean = false) {
    switch (day) {
      case Day.MON:
        (add) ? this.day.monday.push(appointment) : this.day.monday = appointment;
        break;

      case Day.TUE:
        (add) ? this.day.tuesday.push(appointment) : this.day.tuesday = appointment;
        break;

      case Day.WED:
        (add) ? this.day.wednesday.push(appointment) : this.day.wednesday = appointment;
        break;

      case Day.THU:
        (add) ? this.day.thursday.push(appointment) : this.day.thursday = appointment;
        break;

      case Day.FRI:
        (add) ? this.day.friday.push(appointment) : this.day.friday = appointment;
        break;

      case Day.SAT:
        (add) ? this.day.saturday.push(appointment) : this.day.saturday = appointment;
        break;

      case Day.SUN:
        (add) ? this.day.sunday.push(appointment) : this.day.sunday = appointment;
        break;
    }
  }

  init() {
    let appointmentsByDate: any = this.groupByDate();
    _.forEach(appointmentsByDate, appointment => {
      let tempAppointment: any = _.first(appointment);
      this.updateAppointment(parseInt(tempAppointment.day), appointment);
    });   
  }

  private meetingDuration = (start, end) => moment.duration(moment(end).diff(moment(start))).asHours();

  private weekDay = (date) => parseInt(moment(date).format("d"));

  private groupByDate() {
    _.forEach(this.appointments, app => {      
      app.date = moment(app.startTime).format("MM-DD-YYYY");
      app.day = this.weekDay(app.startTime)
    });
    return _.groupBy(this.appointments, 'date');
  }

}
