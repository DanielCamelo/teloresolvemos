const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    hora: {
        type: Date,
        default: Date.now // Si no se proporciona, se usa la hora actual
    },
    usuarioId: {
        type: Schema.Types.ObjectId, // Referencia a la colección de usuarios
        ref: 'Usuario', // Nombre del modelo de usuario
        required: true
    }
}, {
    timestamps: true // Añade automáticamente createdAt y updatedAt
});

const notificacionModel = mongoose.model('Notificacion', notificacionSchema);

module.exports = notificacionModel;
