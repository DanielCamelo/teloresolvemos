const mongoose = require('mongoose');

const mensajeriaSchema = new mongoose.Schema({

  nombreCliente: {
    ref: "Usuario",
    type: String
    },
    nombreRepartidor: {
    ref: "Usuario",
    type: String,
    default: null
    },

  tipoDePaquete: {
    type: String,
    required: true,
  },
  pesoEstimado: {
    type: Number,
    required: true, // Asegúrate de que el peso es un valor numérico
  },
  direccionRecogida: {
    type: String,
    required: true,
  },
  direccionEntrega: {
    type: String,
    required: true,
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
}, {
  timestamps: true, // Añade campos de createdAt y updatedAt
});

const mensajeriaModel = mongoose.model('Mensajeria', mensajeriaSchema);

module.exports = mensajeriaModel;
