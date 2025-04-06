import { Controller, Get, Param } from '@nestjs/common';
import { DentistService } from 'src/services/dentist/dentist.service';

@Controller('api/dentist')
export class DentistController {
  constructor(private readonly dentistService: DentistService) {}

  @Get()
  async findAll() {
    return this.dentistService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.dentistService.findOne(id);
  }
}
