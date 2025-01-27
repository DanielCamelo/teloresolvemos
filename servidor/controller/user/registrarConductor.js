const userModel = require("../../models/userModel"); // Asegúrate de que el modelo esté importado correctamente
const jwt = require('jsonwebtoken'); // Para verificar el token
const bcrypt = require('bcryptjs'); // Para comparar contraseñas
const registrarConductor = async (req, res) => {
    try {
        // Obtener el id del usuario desde el token
        const currentUserId = req.userId; // Asegúrate de que el id del usuario esté incluido en la solicitud
        const { phone, password } = req.body;
        // Buscar al usuario en la base de datos por correo electrónico
        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                error: true,
                success: false
            });
        }
        // Verificar si la contraseña es correcta
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Contraseña incorrecta',
                error: true,
                success: false
            });
        }
        // Verificar y agregar el rol "conductor" si no está presente
        if (!user.role.includes('conductor')) {
            user.role.push('conductor');
        }

        // Guardar los cambios en la base de datos
        const updatedUser = await user.save();
        return res.json({
            data: updatedUser,
            message: 'Usuario actualizado con éxito, ahora tiene los roles: ' + user.role.join(', '),
            success: true,
            error: false
        });
    } catch (err) {
        console.error(err);
        return res.json({
            message: err.message || 'Error al registrar al repartidor',
            error: true,
            success: false
        });
    }
};
module.exports = registrarConductor ;