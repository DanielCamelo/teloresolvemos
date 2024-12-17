const mongoose = require('mongoose');

const trasladoAeropuertoSchema = new mongoose.Schema({

  nombreCliente: {
    ref: "Usuario",
    type: String
    },
    nombreChofer: {
    ref: "Usuario",
    type: String,
    default: null
    },

  tipoDeVehiculo: {
    type: String,
    required: true,
  },
  NumeroPasajeros: {
    type: Number,
    required: true, // Asegúrate de que el peso es un valor numérico
  },
  cantidadDeEquipaje: {
    type: Number,
    required: true, // Asegúrate de que el peso es un valor numérico
  },        
  direccionRecogida: {
    type: String,
    required: true,
  },
  terminalAeropuerto: {
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
  precio: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true, // Añade campos de createdAt y updatedAt
});

const trasladoAeropuertoModel = mongoose.model('TrasladoAeropuerto', trasladoAeropuertoSchema);

module.exports = trasladoAeropuertoModel;

