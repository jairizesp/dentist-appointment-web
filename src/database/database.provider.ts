import { Pool } from 'pg';

export const DatabaseProvider = {
  provide: 'PG_POOL',
  useFactory: async () => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Optional: test connection
    await pool.query('SELECT 1');
    console.log('[DB] PostgreSQL pool initialized');
    return pool;
  },
};
