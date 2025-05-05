const mongoose = require('mongoose');

const barriosSchema = new mongoose.Schema({

    nombreBarrio: {
    type: String,
    required: true
    },

    zona: {
    type: String,
    required: true,
    },

    precioSur: {
    type: Number,
    required: true
    },

    precioNorte: {
    type: Number,
    required: true
    },

    precioCentro: {
    type: Number,
    required: true
    },

    precioOccidente: {
    type: Number,
    required: true
    },

    precioOriente: {
    type: Number,
    required: true
    }
},{
    timestamps: true // Añade campos de createdAt y updatedAt
    
});

const barriosModel = mongoose.model('Barrios', barriosSchema);

module.exports = barriosModel;
