const mongoose = require('mongoose');

const diligenciasSchema = new mongoose.Schema({

  nombreCliente: {
    ref: "Usuario",
    type: String
    },
    nombreRepartidor: {
    ref: "Usuario",
    type: String,
    default: null
    },
    descripcionDiligencia: {
    type: String,
    required: true,
    },
    direccionInvolucrados: {
    type: String,
    required: true,
    },
    documentosNecesarios: {
    type: String,
    },
    fechaHoraRecogida: {
    type: Date,
    required: true,
    },
  estado: {
    type: String,
    enum: ['pendiente', 'en proceso', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  precio: {
    type: Number,
    default: null,
  },
}, {
  timestamps: true, // Añade campos de createdAt y updatedAt
});

const diligenciasModel = mongoose.model('Diligencias', diligenciasSchema);

module.exports = diligenciasModel;
