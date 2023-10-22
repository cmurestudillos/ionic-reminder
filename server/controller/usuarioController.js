const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe.' });
        }

        usuario = new Usuario(req.body);
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt );
        
        usuario.save();

        const payload = {usuario: {id: usuario.id}};

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 86400 // 86400 expires in 24 hours
        });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).send('Ha ocurrido un error.');
    }
};