const Lista = require('../models/Lista');

const Tarea = require('../models/Tarea');

const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    try {
        const { lista } = req.body;
        const existeLista = await Lista.findById(lista);
        if(!existeLista) {
            return res.status(404).json({msg: 'Lista no encontrada.'})
        }
        if(existeLista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error.')
    }
}

exports.obtenerTareas = async (req, res) => {
    try {
        const { lista } = req.query;
        const existeLista = await Lista.findById(lista);
        if(!existeLista) {
            return res.status(404).json({msg: 'Lista no encontrada.'})
        }
        if(existeLista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const tareas = await Tarea.find({ lista }).sort({ creado: -1 });
        res.json({ tareas });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error.');
    }
}

exports.actualizarTarea = async (req, res ) => {
    try {
        const { lista, nombre, estado } = req.body;
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea.'});
        }
        const existeLista = await Lista.findById(lista);
        if(existeLista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true } );
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error.')
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        const { lista  } = req.query;
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea.'});
        }
        const existeLista = await Lista.findById(lista);
        if(existeLista.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada.'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error.')
    }
}