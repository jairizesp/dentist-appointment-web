import { Pool } from 'pg';
import { DentistInformation } from 'src/interface/dentist/dentist.interface';
export declare class DentistService {
    private readonly pool;
    constructor(pool: Pool);
    findAll(): Promise<DentistInformation[]>;
    findOne(id: number): Promise<DentistInformation>;
}
