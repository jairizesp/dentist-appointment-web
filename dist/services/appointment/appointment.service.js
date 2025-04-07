"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let AppointmentService = class AppointmentService {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async getAppointmentByDentist(query) {
        const result = await this.pool.query('SELECT * FROM appointments WHERE dentist_id = $1 AND appointment_date = $2', [query.dentist_id, query.appointment_date]);
        return result.rows;
    }
    async addAppointment(payload) {
        const appointment_date = payload.appointment_date.toString()?.split('T')[0];
        const response = await this.pool.query('INSERT INTO appointments(dentist_id, user_id, appointment_date, "from", "to") VALUES($1, $2, $3, $4, $5) RETURNING *', [
            payload.dentist_id,
            payload.user_id,
            appointment_date,
            payload.from,
            payload.to,
        ]);
        const appointment = response.rows[0];
        return appointment;
    }
    async getAppointmentByPatient(user_id) {
        const result = await this.pool.query(`SELECT 
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
        ORDER BY a.appointment_date ASC;`, [user_id]);
        const adjustedResults = result.rows.map((row) => {
            row.appointment_date = new Date(row.appointment_date).toLocaleDateString();
            return row;
        });
        return adjustedResults;
    }
    async getPreviousAppointmentByPatient(user_id) {
        const result = await this.pool.query(`SELECT a.*, d.first_name, d.last_name, d.specialization 
      FROM appointments a
      LEFT JOIN dentist d ON d.id = a.dentist_id
      WHERE a.user_id = $1 
      AND ( a.appointment_date < CURRENT_DATE
      OR (a.appointment_date = CURRENT_DATE AND (
          CASE 
            WHEN a.from < 8 THEN a.from + 12
            ELSE a.from
          END
        ) < EXTRACT(HOUR FROM CURRENT_TIMESTAMP)))`, [user_id]);
        const adjustedResults = result.rows.map((row) => {
            row.appointment_date = new Date(row.appointment_date).toLocaleDateString();
            return row;
        });
        return adjustedResults;
    }
    async cancelAppointment(id) {
        try {
            const result = await this.pool.query('UPDATE appointments SET is_cancelled = TRUE WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async rescheduleAppointment(payload) {
        try {
            console.log(payload);
            const response = await this.pool.query(`UPDATE appointments 
       SET appointment_date = $1, "from" = $2, "to" = $3
       WHERE id = $4
       RETURNING *
      `, [payload.appointment_date, payload.from, payload.to, payload.id]);
            console.log(response.rows);
            if (!response.rows.length) {
                throw new common_1.BadRequestException('Sent payload could be invalid');
            }
            return response.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Something went wrong.');
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PG_POOL')),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map