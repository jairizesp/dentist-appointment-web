export interface Appointment {
  id: number;
  dentist_id: number;
  user_id: number;
  appointment_date: string;
  from: number;
  to: number;
}

export interface ReschedAppointment {
  id: number;
  appointment_date: string;
  from: number;
  to: number;
}
