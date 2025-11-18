// src/validators/task.validator.js
const { body, param, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


// Reglas de validación para crear una tarea
const createTaskValidator = [
    body('title')
    .exists({ checkFalsy: true})
    .withMessage('El titulo es obligatorio')
    .isString()
    .withMessage('El titulo debe ser una cadea de texto.'),

    body('description')
    .optional()
    .isString()
    .withMessage('La descripcion debe ser una cadena de texto.'),
];


// Reglas de validacion para la actualizacion de una tarea
const updateTaskValidator = [
    body('title')
    .optional()
    .isString()
    .withMessage('El titulo debe ser una cadena de texto.'),

    body('description')
    .optional()
    .isString()
    .withMessage('La descripcion debe ser una cadena de texto.'),

    body('completed')
    .optional()
    .isBoolean()
    .withMessage('El campo "completed" debe ser un valor booleano (true/false).'),
];


// Reglas de validacion para el ID en los parametros de la URL
const idParamValidator = [
    param('id')
        .isInt ({ min: 1})
        .withMessage('El ID debe ser un entero positivo.')
];


module.exports = {
    handleValidationErrors,
    createTaskValidator,
    updateTaskValidator,
    idParamValidator,
};
