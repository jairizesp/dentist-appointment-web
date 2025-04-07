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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    async validateUser(credentials) {
        if (!credentials.email || !credentials.password) {
            throw new common_1.NotAcceptableException('Empty values not acceptable.');
        }
        if (credentials.password.length < 6) {
            throw new common_1.NotAcceptableException('Password must be at least 6 or more characters.');
        }
        const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [
            credentials.email,
        ]);
        const user = res.rows[0];
        if (!user) {
            throw new common_1.NotAcceptableException('Invalid credentials');
        }
        if (user && (await bcrypt.compare(credentials.password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(credentials) {
        const payload = { email: credentials.email, sub: credentials.id };
        return {
            access_token: jwt.sign(payload, this.JWT_SECRET_KEY, {
                expiresIn: '1h',
            }),
            data: credentials,
            response: {
                message: 'Logged in successfully',
                status_code: common_1.HttpStatus.OK,
            },
        };
    }
    async verifyToken(token) {
        try {
            return jwt.verify(token, this.JWT_SECRET_KEY);
        }
        catch (err) {
            return null;
        }
    }
    async validateUserIfExists(email) {
        const res = await this.pool.query('SELECT id, email FROM users WHERE email = $1', [email]);
        return res.rows.length > 0;
    }
    async signup(userInformation) {
        try {
            const isUserExists = await this.validateUserIfExists(userInformation.email);
            if (isUserExists) {
                throw new common_1.ConflictException('Email already exist.');
            }
            if (userInformation.password.length < 6) {
                throw new common_1.NotAcceptableException('Password must be at least 6 or more characters.');
            }
            const res = await this.pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *', [
                userInformation.first_name,
                userInformation.last_name,
                userInformation.email,
                await bcrypt.hash(userInformation.password, 10),
            ]);
            const user = res.rows[0];
            const { password, ...result } = user;
            return {
                data: result,
                response: {
                    message: 'Registered successfully!',
                    status_code: common_1.HttpStatus.OK,
                },
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PG_POOL')),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map