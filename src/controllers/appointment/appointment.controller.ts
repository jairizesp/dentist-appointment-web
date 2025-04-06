import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Appointment } from 'src/interface/appointment/appointment.interface';
import { AppointmentService } from 'src/services/appointment/appointment.service';

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
}
