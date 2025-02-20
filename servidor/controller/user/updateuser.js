const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId; // ID del usuario autenticado
        const { userId, email, name, role, status } = req.body;

        // Validar que el userId proporcionado sea el mismo que el sessionUser (si no es admin)
        if (sessionUser !== userId) {
            const currentUser = await userModel.findById(sessionUser);
            if (!currentUser) {
                return res.status(404).json({
                    message: "Usuario no encontrado.",
                    error: true,
                    success: false
                });
            }
            if (!currentUser.role.includes('administrador')) {
                return res.status(403).json({
                    message: "No tienes permisos para actualizar este usuario.",
                    error: true,
                    success: false
                });
            }
        }

        // Preparar los campos que se van a actualizar
        const payload = {};

        if (email) payload.email = email;
        if (name) payload.name = name;
        if (status) payload.status = status;

        // Manejo de roles asegurando que siempre sea un array
        if (role) {
            const currentUser = await userModel.findById(userId);
            if (!currentUser) {
                return res.status(404).json({
                    message: "Usuario no encontrado.",
                    error: true,
                    success: false
                });
            }

            let rolesArray = Array.isArray(currentUser.role) ? currentUser.role : [];
            if (Array.isArray(role)) {
                payload.role = role; // Si el frontend envía un array, lo usa directamente
            } else {
                if (rolesArray.includes(role)) {
                    payload.role = rolesArray.filter(r => r !== role); // Elimina el rol si ya existe
                } else {
                    payload.role = [...rolesArray, role]; // Agrega el rol si no existe
                }
            }
        }

        // Buscar y actualizar el usuario
        const user = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
                error: true,
                success: false
            });
        }

        res.json({
            data: user,
            message: "Usuario actualizado correctamente.",
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;

