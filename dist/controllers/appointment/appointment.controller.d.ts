import { Appointment } from 'src/interface/appointment/appointment.interface';
import { AppointmentService } from 'src/services/appointment/appointment.service';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    getAppointmentByDentist(query: {
        dentist_id: number;
        appointment_date: string;
    }): Promise<Appointment[]>;
    addAppointment(payload: Omit<Appointment, 'id'>): Promise<Appointment>;
    getAppointmentByPatient(id: number): Promise<any>;
    getPreviousAppointmentByPatient(id: number): Promise<any>;
    cancelAppointment(id: string): Promise<any>;
}
