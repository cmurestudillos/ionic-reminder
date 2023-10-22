const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    lista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);