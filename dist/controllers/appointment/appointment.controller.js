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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("../../services/appointment/appointment.service");
let AppointmentController = class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async getAppointmentByDentist(query) {
        return this.appointmentService.getAppointmentByDentist({
            dentist_id: Number(query.dentist_id),
            appointment_date: query.appointment_date,
        });
    }
    async addAppointment(payload) {
        return this.appointmentService.addAppointment(payload);
    }
    async getAppointmentByPatient(id) {
        return this.appointmentService.getAppointmentByPatient(Number(id));
    }
    async getPreviousAppointmentByPatient(id) {
        return this.appointmentService.getPreviousAppointmentByPatient(Number(id));
    }
    async cancelAppointment(id) {
        return this.appointmentService.cancelAppointment(Number(id));
    }
    async rescheduleAppointment(payload) {
        return this.appointmentService.rescheduleAppointment(payload);
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Get)('/by-dentist'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointmentByDentist", null);
__decorate([
    (0, common_1.Post)('/add-appointment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "addAppointment", null);
__decorate([
    (0, common_1.Get)('/by-patient/upcoming/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointmentByPatient", null);
__decorate([
    (0, common_1.Get)('/by-patient/history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getPreviousAppointmentByPatient", null);
__decorate([
    (0, common_1.Put)('/cancel-appointment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "cancelAppointment", null);
__decorate([
    (0, common_1.Put)('/resched-appointment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "rescheduleAppointment", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('api/appointment'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map