const express = require('express');
const router = express.Router();
const listaController = require('../controller/listaController');
const auth = require('../middleware/auth');

// Listado general de listas
router.get('/', auth, listaController.obtenerListas );
//Crear Lista
router.post('/', auth, listaController.crearLista );
// Actualizar Lista
router.put('/:id', auth, listaController.actualizarLista );
// Eliminar listas
router.delete('/:id', auth, listaController.eliminarLista );

module.exports = router;