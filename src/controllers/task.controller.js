// src/controllers/task.controller.js
const pool = require('../db');

// Definir los controladores

// GET /api/tasks - Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// GET /api/tasks/:id - Obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

// POST /api/tasks - Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// PUT /api/tasks/:id - Actualizar una tarea por ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // 1. Primero, obtenemos la tarea actual de la base de datos
    const currentTaskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (currentTaskResult.rowCount === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada para actualizar' });
    }

    const currentTask = currentTaskResult.rows[0];

    // 2. Fusionamos los datos: si un campo viene en el body, lo usamos; si no, mantenemos el valor antiguo.
    const newTitle = title !== undefined ? title : currentTask.title;
    const newDescription = description !== undefined ? description : currentTask.description;
    const newCompleted = completed !== undefined ? completed : currentTask.completed;

    // 3. Ejecutamos la actualización con los datos completos y seguros
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [newTitle, newDescription, newCompleted, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Este console.error te ayudará a ver errores de base de datos más claramente en la terminal
    console.error('Error en updateTask:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

// DELETE /api/tasks/:id - Eliminar una tarea por ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
    }
    // 204 No Content es el estándar para una eliminación exitosa sin respuesta.
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};

// Exportar los controladores
module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};