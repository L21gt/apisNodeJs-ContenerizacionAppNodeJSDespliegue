const express = require('express'); // Importar express
const taskRoutes = require('./routes/task.routes.js'); // Importar rutas de tareas

const app = express(); // Inicializar express

// Middlewares
app.use(express.json()); // Middleware para parsear JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API RESTful con Express.js esta funcionando correctamente');
});

// Usar las rutas de tareas con el prefijo /api/tasks
app.use('/api/tasks', taskRoutes);

module.exports = app; // Exportar la aplicación para usar en server.js