const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({
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
        type: String, // Para permitir diferentes formatos de números telefónicos
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Los estados permitidos
        default: 'active'
    },
    generatedReports: [String], // Lista de reportes generados o visualizados
    managedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia a los usuarios que gestionan
    }]
}, {
    timestamps: true // Añade automáticamente los campos createdAt y updatedAt
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;
