import sql from 'mssql';
import 'dotenv/config';

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

async function connectToDatabase() {
  try {
    if (pool) return pool;

    pool = await sql.connect(config);
    console.log('Conexión a SQL Server exitosa');
    return pool;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
}

/* Cierre limpio */
process.on('SIGINT', async () => {
  if (pool) {
    await pool.close();
    console.log('Pool SQL cerrado');
  }
  process.exit(0);
});

export { sql, connectToDatabase as getConnection };
