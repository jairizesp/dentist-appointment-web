import { Pool } from 'pg';
import { Appointment } from 'src/interface/appointment/appointment.interface';
export declare class AppointmentService {
    private readonly pool;
    constructor(pool: Pool);
    getAppointmentByDentist(query: {
        dentist_id: number;
        appointment_date: string;
    }): Promise<Appointment[]>;
    addAppointment(payload: Omit<Appointment, 'id'>): Promise<Appointment>;
    getAppointmentByPatient(user_id: number): Promise<any>;
    getPreviousAppointmentByPatient(user_id: number): Promise<any>;
    cancelAppointment(id: number): Promise<any>;
}
