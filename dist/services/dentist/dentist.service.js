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
exports.DentistService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let DentistService = class DentistService {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const res = await this.pool.query('SELECT * FROM dentist');
        return res.rows;
    }
    async findOne(id) {
        const res = await this.pool.query('SELECT * FROM dentist WHERE id = $1', [
            id,
        ]);
        if (!res.rows.length) {
            throw new common_1.NotFoundException(`ID: ${id} Not Found.`);
        }
        return res.rows[0];
    }
};
exports.DentistService = DentistService;
exports.DentistService = DentistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PG_POOL')),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object])
], DentistService);
//# sourceMappingURL=dentist.service.js.map