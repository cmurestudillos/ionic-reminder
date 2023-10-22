const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

// Autentificacion del usuario
router.post('/', authController.autenticarUsuario );
// Traer datos del usuario autenticado
router.get('/', auth, authController.usuarioAutenticado );

module.exports = router;