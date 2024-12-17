const mongoose = require('mongoose');

const domiciliosSchema = new mongoose.Schema({

  nombreCliente: {
    ref: "Usuario",
    type: String
    },
    nombreRepartidor: {
    ref: "Usuario",
    type: String,
    default: null
    },
    categoriaProducto: {
    type: String,
    required: true,
    },
    descripcionProducto: {
    type: String,
    required: true,
    },
  direccionRecogida: {
    type: String,
    required: true,
  },
  direccionEntrega: {
    type: String,
    required: true,
  },
  opcionPago: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
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

const domiciliosModel = mongoose.model('Domicilios', domiciliosSchema);

module.exports = domiciliosModel;