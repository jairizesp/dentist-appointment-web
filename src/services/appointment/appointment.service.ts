import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { Appointment } from '../../interface/appointment/appointment.interface';

@Injectable()
export class AppointmentService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async getAppointmentByDentist(query: {
    dentist_id: number;
    appointment_date: string;
  }): Promise<Appointment[]> {
    const result = await this.pool.query(
      'SELECT * FROM appointments WHERE dentist_id = $1 AND appointment_date = $2',
      [query.dentist_id, query.appointment_date],
    );

    return result.rows;
  }

  async addAppointment(payload: Omit<Appointment, 'id'>): Promise<Appointment> {
    const appointment_date = payload.appointment_date.toString()?.split('T')[0];
    const response = await this.pool.query(
      'INSERT INTO appointments(dentist_id, user_id, appointment_date, "from", "to") VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        payload.dentist_id,
        payload.user_id,
        appointment_date,
        payload.from,
        payload.to,
      ],
    );

    const appointment = response.rows[0];

    return appointment;
  }

  async getAppointmentByPatient(user_id: number) {
    const result = await this.pool.query(
      `SELECT 
        a.*, 
        d.first_name, 
        d.last_name, 
        d.specialization 
      FROM 
        appointments a
      LEFT JOIN 
        dentist d ON d.id = a.dentist_id
      WHERE 
        a.user_id = $1
        AND  (a.appointment_date > CURRENT_DATE
      OR (a.appointment_date = CURRENT_DATE AND (
          CASE 
            WHEN a.from < 8 THEN a.from + 12
            ELSE a.from
          END
        ) > EXTRACT(HOUR FROM CURRENT_TIMESTAMP)))
        AND a.is_cancelled = FALSE
        ORDER BY a.appointment_date ASC;`,
      [user_id],
    );

    const adjustedResults = result.rows.map((row) => {
      row.appointment_date = new Date(
        row.appointment_date,
      ).toLocaleDateString(); // Adjust as needed
      return row;
    });

    return adjustedResults;
  }

  async getPreviousAppointmentByPatient(user_id: number) {
    const result = await this.pool.query(
      `SELECT a.*, d.first_name, d.last_name, d.specialization 
      FROM appointments a
      LEFT JOIN dentist d ON d.id = a.dentist_id
      WHERE a.user_id = $1 
      AND ( a.appointment_date < CURRENT_DATE
      OR (a.appointment_date = CURRENT_DATE AND (
          CASE 
            WHEN a.from < 8 THEN a.from + 12
            ELSE a.from
          END
        ) < EXTRACT(HOUR FROM CURRENT_TIMESTAMP)))`,
      [user_id],
    );

    return result.rows;
  }

  async cancelAppointment(id: number) {
    try {
      const result = await this.pool.query(
        'UPDATE appointments SET is_cancelled = TRUE WHERE id = $1 RETURNING *',
        [id],
      );

      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
