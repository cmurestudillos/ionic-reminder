const express = require('express'),
router = express.Router();
const usuarioController = require('../controller/usuarioController');

// Registro de usuarios
router.post('/', usuarioController.crearUsuario);

module.exports = router;