import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { DentistInformation } from 'src/interface/dentist/dentist.interface';

@Injectable()
export class DentistService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async findAll(): Promise<DentistInformation[]> {
    const res = await this.pool.query('SELECT * FROM dentist');

    return res.rows;
  }

  async findOne(id: number): Promise<DentistInformation> {
    const res = await this.pool.query('SELECT * FROM dentist WHERE id = $1', [
      id,
    ]);

    if (!res.rows.length) {
      throw new NotFoundException(`ID: ${id} Not Found.`);
    }

    return res.rows[0];
  }
}
