const mongoose = require('mongoose');

const ListaSchema = mongoose.Schema({
    titulo: {
        type: String, 
        required: true
    },   
    creadaEn: {
        type: Date,
        default: Date.now()
    }, 
    terminadaEn: {
        type: Date,
        default: null
    },  
    terminada: {
        type: Boolean,
        default: false 
    },        
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Lista', ListaSchema);