
    import { createPool } from 'mysql2/promise';
     import dotenv from 'dotenv';
    dotenv.config();

// Configuración con valores por defecto y usando variables de entorno
const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'products',
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    timezone: 'local',
    charset: 'utf8mb4',
    decimalNumbers: true,
    connectionLimit: 20,                // (Num_CPU * 2) + 1
    queueLimit: 100,                    // Evitar sobrecarga de memoria
    idleTimeout: 30000,                 // 30 segundos
    keepAliveInitialDelay: 10000       // 10 segundos
};
