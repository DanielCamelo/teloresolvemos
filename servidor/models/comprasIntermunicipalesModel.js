const mongoose = require('mongoose');

const comprasIntermunicipalesSchema = new mongoose.Schema({
  nombreCliente: {
    ref: "Usuario",
    type: String
    },
    nombreRepartidor: {
    ref: "Usuario",
    type: String,
    default: null
    },
  productos: {
    type: String,
    required: true,
    trim: true // Para eliminar espacios innecesarios
  },
  ubicacionCompra: {
    type: String,
    required: true,
    trim: true
  },
  direccionEntrega: {
    type: String,
    required: true,
    trim: true
  },
  presupuestoMaximo: {
    type: Number,
    default: null // Opcional
  },
  fechaHoraEntrega: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en proceso', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  precio: {
    type: Number,
    default: null // Calculado según el servicio
  }
}, {
  timestamps: true // Añade campos de createdAt y updatedAt
});

const comprasIntermunicipalesModel = mongoose.model('ComprasIntermunicipales', comprasIntermunicipalesSchema);

module.exports = comprasIntermunicipalesModel;