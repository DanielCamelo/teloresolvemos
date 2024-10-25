const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
    tipoServicio: {
        type: String,
        enum: ['mensajería', 'domicilios', 'transporte_particular', 'transporte_salud', 'aeropuerto', 'diligencias'], // Tipos permitidos
        required: true
    },
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia a la colección de usuarios (quien solicita el servicio)
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en curso', 'completado'], // Estados permitidos
        default: 'pendiente'
    },
    fechaSolicitud: {
        type: Date,
        default: Date.now // Por defecto, la fecha actual
    },
    detallesServicio: {
        mensajeria: {
            tipoPaquete: String,
            pesoEstimado: Number,
            dimensiones: String,
            direccionRecogida: String,
            direccionEntrega: String,
            fechaRecogida: Date
        },
        domicilios: {
            categoria: String,
            productos: [String],
            direccionRecogida: String,
            direccionEntrega: String,
            opcionPago: {
                type: String,
                enum: ['en línea', 'contra entrega'] // Opciones permitidas
            },
            comentarios: String
        },
        transporteParticular: {
            tipoVehiculo: String,
            numeroPasajeros: Number,
            direccionRecogida: String,
            direccionDestino: String,
            opcionViaje: {
                type: String,
                enum: ['solo ida', 'ida y vuelta'] // Opciones permitidas
            },
            fechaRecogida: Date
        },
        transporteSalud: {
            direccionRecogida: String,
            direccionDestino: String,
            descripcionAdicional: String,
            fechaRecogida: Date
        },
        aeropuerto: {
            numeroPasajeros: Number,
            tipoVehiculo: String,
            cantidadEquipaje: Number,
            direccionRecogida: String,
            terminalAeropuerto: String,
            horaVuelo: Date
        },
        diligencias: {
            descripcionDiligencia: String,
            direcciones: [String],
            documentacion: String,
            fechaDiligencia: Date
        }
    }
}, {
    timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

const servicesModel = mongoose.model('Servicio', serviceSchema);

module.exports = servicesModel;