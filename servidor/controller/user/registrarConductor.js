const userModel = require("../../models/userModel"); // Asegúrate de que el modelo esté importado correctamente
const jwt = require('jsonwebtoken'); // Para verificar el token
const bcrypt = require('bcryptjs'); // Para comparar contraseñas
const registrarConductor = async (req, res) => {
    try {
        // Obtener el id del usuario desde el token
        const currentUserId = req.userId; // Asegúrate de que el id del usuario esté incluido en la solicitud
        const { email, password } = req.body;
        // Buscar al usuario en la base de datos por correo electrónico
        const user = await userModel.findOne({ email });
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
        // Si el usuario ya tiene el rol de "conductor", agregamos el rol "repartidor"
        if (user.role.includes('repartidor')) {
            if (!user.role.includes('conductor')) {
                user.role.push('conductor');
            }
        } else {
            // Si el usuario no tiene el rol de "conductor", se asigna el rol "repartidor"
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