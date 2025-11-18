// conexion a la base de datos

const { Pool } = require('pg'); // Importar Pool de pg
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}); // Cargar variables de entorno

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Verificar la conexión a la base de datos
pool.on('connect', () => {
    // Evitamos el log en modo test para no ensuciar la salida
    if (process.env.NODE_ENV !== 'test') {
      console.log('🔗 Conectado a la base de datos!');
    }
});

module.exports = pool;