import { Injectable } from '@angular/core';

import * as _ from "lodash";
import * as moment from 'moment';

@Injectable()
export class UtilService {

  constructor() { }

  findIndex = (collections, id) => _.findIndex(collections, { id: id });

  meetingDuration = (start, end) => moment.duration(moment(end).diff(moment(start))).asHours();

  getHours = (n) => Array.from(new Array(n), (x, i) => i);

  weekDay = (date) => parseInt(moment(date).format("d"));

  dialogConfig(event) {
    return { data: event, height: "400px", width: '600px' }
  }

  style(event) {
    const hourlyHeight = 95, topPosition = 100.5;
    let diff = this.meetingDuration(event.startTime, event.endTime);
    let hhmm: any = moment(event.startTime).format('HH:mm').split(':');
    let top = ((hhmm[1] == 0) ? hhmm[0] * topPosition : (hhmm[0] * topPosition) + 45) + 'px';
    let height = diff * hourlyHeight;
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

  groupByDate(appointments) {
    _.forEach(appointments, app => {
      app.date = moment(app.startTime).format("MM-DD-YYYY");
      app.day = this.weekDay(app.startTime)
    });
    return _.groupBy(appointments, 'date');
  }

}
