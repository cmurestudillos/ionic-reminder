const Lista = require('../models/Lista');
const { validationResult } = require('express-validator');

exports.obtenerListas = async (req, res) => {
    try {
        const listas = await Lista.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ listas });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al obtener las listas.');
    }
}

exports.crearLista = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    try {
        const lista = new Lista(req.body);
        lista.creador = req.usuario.id;
        await lista.save();
        res.json({lista, msg:'Lista creada correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al crear la lista.');
    }
}

exports.actualizarLista = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        let lista = await Lista.findById(req.params.id);
        if(!lista) {
            return res.status(404).json({msg: 'Lista no encontrada.'})
        }
        if(lista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }

        const nuevaLista = {};
        nuevaLista.titulo = req.body.titulo;
        lista = await Lista.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevaLista}, { new: true });
        res.json({lista, msg: 'Lista actualizada correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar actualizar la lista.');
    }
}

exports.eliminarLista = async (req, res ) => {
    try {
        let lista = await Lista.findById(req.params.id);
        if(!lista) {
            return res.status(404).json({msg: 'Lista no encontrada.'})
        }
        if(lista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        await Lista.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Lista eliminada.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al eliminar la lista.')
    }
}