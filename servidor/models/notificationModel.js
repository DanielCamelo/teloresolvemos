const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacionSchema = new mongoose.Schema({
    usuarioID:{
        ref: "Usuario",
        type:String
    },
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
    leido: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Añade automáticamente createdAt y updatedAt
});

const notificacionModel = mongoose.model('Notificacion', notificacionSchema);

module.exports = notificacionModel;
