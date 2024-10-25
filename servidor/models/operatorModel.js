const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String, // Para manejar diferentes formatos de números de teléfono
        required: true
    },
    status: {
        type: String,
        enum: ['activo', 'inactivo'], // Solo puede ser activo o inactivo
        default: 'activo'
    },
    assignedService: [{
        type: Schema.Types.ObjectId,
        ref: 'Servicio' // Referencia a la colección de servicios
    }]
}, {
    timestamps: true // Añade automáticamente createdAt y updatedAt
});

const operatorModel = mongoose.model('Operador', operatorSchema);

module.exports = operatorModel;
