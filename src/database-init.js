// src/database-init.js
const pool = require('./db');

const setupDatabase = async () => {
  try {
    console.log('Creando la tabla "tasks"...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabla "tasks" creada exitosamente.');
  } catch (error) {
    console.error('❌ Error creando la tabla:', error);
  } finally {
    // Cerramos la conexión del pool ya que este es un script de un solo uso.
    await pool.end();
  }
};

setupDatabase();