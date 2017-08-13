import { Appointment } from "../shared/appointment";

export class Days {
    monday = Array<Appointment>();
    tuesday = Array<Appointment>();
    wednesday = Array<Appointment>();
    thursday = Array<Appointment>();
    friday = Array<Appointment>();
    saturday = Array<Appointment>();
    sunday = Array<Appointment>();

    static all = () => ['Monday 26', 'Tuesday 27', 'Wednesday 28', 'Thursday 29', 'Friday 30', 'Saturday 1', 'Sunday 2']
}

export enum Day {
    SUN, MON, TUE, WED, THU, FRI, SAT
}