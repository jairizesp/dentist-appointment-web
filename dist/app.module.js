"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./controllers/auth/auth.controller");
const database_module_1 = require("./database/database.module");
const auth_service_1 = require("./services/auth/auth.service");
const dentist_service_1 = require("./services/dentist/dentist.service");
const dentist_controller_1 = require("./controllers/dentist/dentist.controller");
const appointment_controller_1 = require("./controllers/appointment/appointment.controller");
const appointment_service_1 = require("./services/appointment/appointment.service");
const auth_middleware_1 = require("./middlewares/auth/auth.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'api/auth/signup', method: common_1.RequestMethod.POST }, { path: 'api/auth/login', method: common_1.RequestMethod.POST })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            dentist_controller_1.DentistController,
            appointment_controller_1.AppointmentController,
        ],
        providers: [app_service_1.AppService, auth_service_1.AuthService, dentist_service_1.DentistService, appointment_service_1.AppointmentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map