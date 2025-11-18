// tests/tasks.test.js
const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

let taskId; // Variable para almacenar el ID de la tarea creada

// Bloque que se ejecuta una vez antes de todas las pruebas
beforeAll(async () => {
    // Crear la tabla de tareas en la base de datos de prueba
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
});

// Bloque que se ejecuta una vez después de todas las pruebas
afterAll(async () => {
    // Limpiar la base de datos de prueba y cerrar la conexion
    await pool.query('DROP TABLE IF EXISTS tasks;');
    await pool.end();
});


describe('API de Tareas', () => {
    // PRUEBA 1: Probar creacion (POST) con datos validos
    it('deberia crear una nueva tarea con datos validos', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'Tarea de prueba', description: 'Descripcion de prueba' });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Tarea de prueba');
            taskId = response.body.id; // Guardar el ID para pruebas posteriores
    });

    // PRUEBA 2: Probar creacion (POST) con datos invalidos
    it('no deberia crear una tarea con datos invalidos', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: null }); // Titulo nulo e invalido

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('errors');
    });

    // PRUEBA 3: Probar obtencion (GET) de todas las tareas
    it('debería obtener una lista de todas las tareas', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // PRUEBA 4: Probar actualización (PUT) de un elemento
  it('debería actualizar una tarea existente', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Tarea actualizada', completed: true });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Tarea actualizada');
    expect(response.body.completed).toBe(true);
  });

  // PRUEBA 5: Probar eliminación (DELETE) de un elemento
  it('debería eliminar una tarea existente', async () => {
    // Primero, eliminamos la tarea
    const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);
    expect(deleteResponse.statusCode).toBe(204);

    // Luego, intentamos obtenerla y esperamos un 404
    const getResponse = await request(app).get(`/api/tasks/${taskId}`);
    expect(getResponse.statusCode).toBe(404);
  });
});