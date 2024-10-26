const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true, // No se puedes repetir correos
        required: true // Este campo es obligatorio
    },
    password: String,
    phone: {
        type: Number, // Cambiado de Number a String para manejar distintos formatos de teléfono
        unique: true,
        required: true
    },
    role: String,
    status: {
        type: String,
        enum: ['activo', 'bloqueado', 'suspendido'], // Estados posibles
        default: 'activo'
    }
}, {
    timestamps: true // Añade campos de createdAt y updatedAt automáticamente
});

const userModel = mongoose.model('Usuario', userSchema);

module.exports = userModel;
