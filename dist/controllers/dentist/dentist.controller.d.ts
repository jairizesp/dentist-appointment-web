import { DentistService } from 'src/services/dentist/dentist.service';
export declare class DentistController {
    private readonly dentistService;
    constructor(dentistService: DentistService);
    findAll(): Promise<import("../../interface/dentist/dentist.interface").DentistInformation[]>;
    findOne(id: number): Promise<import("../../interface/dentist/dentist.interface").DentistInformation>;
}
