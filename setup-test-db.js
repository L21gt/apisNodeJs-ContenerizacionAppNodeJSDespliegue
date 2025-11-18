const { Client } = require('pg');
require('dotenv').config({ path: '.env.test' });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  // Nos conectamos a la DB por defecto 'postgres' para poder crear otra.
  database: 'postgres', 
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTestDatabase = async () => {
  try {
    await client.connect();
    // Verificamos si la base de datos ya existe
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'`);
    if (res.rowCount === 0) {
      console.log(`Creando la base de datos de prueba: ${process.env.DB_DATABASE}`);
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log('✅ Base de datos de prueba creada exitosamente.');
    } else {
      console.log('ℹ️ La base de datos de prueba ya existe.');
    }
  } catch (error) {
    console.error('❌ Error al crear la base de datos de prueba:', error);
  } finally {
    await client.end();
  }
};

createTestDatabase();