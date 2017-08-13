import { Appointment } from "../shared/appointment";

export class Days {
    monday = Array<Appointment>();
    tuesday = Array<Appointment>();
    wednesday = Array<Appointment>();
    thursday = Array<Appointment>();
    friday = Array<Appointment>();
    saturday = Array<Appointment>();
    sunday = Array<Appointment>();
}

export enum Day {
    SUN, MON, TUE, WED, THU, FRI, SAT
}