const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, // No se puedes repetir correos
        required: true // Este campo es obligatorio
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Cambiado de Number a String para manejar distintos formatos de teléfono
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['cliente', 'operador', 'administrativo'], // Valores permitidos
        required: true
    },
    status: {
        type: String,
        enum: ['activo', 'bloqueado', 'suspendido'], // Estados posibles
        default: 'activo'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Añade campos de createdAt y updatedAt automáticamente
});

const userModel = mongoose.model('Usuario', userSchema);

module.exports = userModel;
