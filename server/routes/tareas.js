const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const auth = require('../middleware/auth');

// Obtener tareas de una lista
router.get('/', auth, tareaController.obtenerTareas );
// Crear tareas
router.post('/', auth, tareaController.crearTarea );
// Actualizar tarea de una lista
router.put('/:id', auth, tareaController.actualizarTarea );
// Eliminar tarea de una lista
router.delete('/:id', auth, tareaController.eliminarTarea );

module.exports = router;