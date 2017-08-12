import { Injectable } from '@angular/core';

import { RestApi } from "../shared/services/rest-api";

@Injectable()
export class CalendarService {

  constructor(private restApi: RestApi) { }

  getAppointments = () => this.restApi.get('slots.json');

}
