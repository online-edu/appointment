export class Appointment {
    id: string;
    startTime: Date;
    endTime: Date;
    available: boolean;
    day: number;
    name?: string;
    email?: string;
    phone?: string;
}