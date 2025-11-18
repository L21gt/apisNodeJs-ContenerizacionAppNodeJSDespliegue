// src/routes/task.routes.js

const { Router } = require('express'); // Importar Router de express
const { // Importar controladores
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/task.controller.js');


// Importamos los validadores
const {
    createTaskValidator,
    updateTaskValidator,
    idParamValidator,
    handleValidationErrors,
} = require('../validators/task.validator.js');

const router = Router(); // Crear una instancia de Router


// Definimos los 5 endpoints requeridos

// GET /api/tasks - Obtener todas las tareas (no necesita validacion)
router.get('/', getTasks);

// GET /api/tasks/:id - Obtener una tarea por ID
router.get('/:id', idParamValidator, handleValidationErrors,getTaskById);

// POST /api/tasks - Crear una nueva tarea
router.post('/', createTaskValidator, handleValidationErrors, createTask);

// PUT /api/tasks/:id - Actualizar una tarea por ID
router.put('/:id', [...idParamValidator, ...updateTaskValidator], handleValidationErrors, updateTask);

// DELETE /api/tasks/:id - Eliminar una tarea por ID
router.delete('/:id', idParamValidator, handleValidationErrors, deleteTask);

module.exports = router;