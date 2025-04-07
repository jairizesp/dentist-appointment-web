"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const pg_1 = require("pg");
exports.DatabaseProvider = {
    provide: 'PG_POOL',
    useFactory: async () => {
        const pool = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await pool.query('SELECT 1');
        await pool.query("SET TIMEZONE TO 'Asia/Manila'");
        console.log('[DB] PostgreSQL pool initialized');
        return pool;
    },
};
//# sourceMappingURL=database.provider.js.map