import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  Appointment,
  ReschedAppointment,
} from '../../interface/appointment/appointment.interface';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Controller('api/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/by-dentist')
  async getAppointmentByDentist(
    @Query() query: { dentist_id: number; appointment_date: string },
  ) {
    return this.appointmentService.getAppointmentByDentist({
      dentist_id: Number(query.dentist_id),
      appointment_date: query.appointment_date,
    });
  }

  @Post('/add-appointment')
  async addAppointment(@Body() payload: Omit<Appointment, 'id'>) {
    return this.appointmentService.addAppointment(payload);
  }

  @Get('/by-patient/upcoming/:id')
  async getAppointmentByPatient(@Param('id') id: number) {
    return this.appointmentService.getAppointmentByPatient(Number(id));
  }

  @Get('/by-patient/history/:id')
  async getPreviousAppointmentByPatient(@Param('id') id: number) {
    return this.appointmentService.getPreviousAppointmentByPatient(Number(id));
  }

  @Put('/cancel-appointment/:id')
  async cancelAppointment(@Param('id') id: string) {
    return this.appointmentService.cancelAppointment(Number(id));
  }

  @Put('/resched-appointment')
  async rescheduleAppointment(@Body() payload: ReschedAppointment) {
    return this.appointmentService.rescheduleAppointment(payload);
  }
}
