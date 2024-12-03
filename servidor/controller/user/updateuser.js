const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId; // ID del usuario autenticado (esto debería provenir de un middleware de autenticación)
        const { userId, email, name, role, status } = req.body;

        // Validar que el userId proporcionado sea el mismo que el sessionUser (si no es admin)
        if (sessionUser !== userId) {
            // Si no son iguales, verificar si el usuario tiene permisos de admin para modificar
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

        if (email) {
            payload.email = email;  // Solo actualiza el email si se proporciona
        }

        if (name) {
            payload.name = name;  // Solo actualiza el nombre si se proporciona
        }

        if (status) {
            payload.status = status; // Solo actualiza el estado si se proporciona
        }

        // Si se proporciona un nuevo rol, asegurarnos de agregarlo al rol existente
        if (role) {
            // Si `role` es un string, lo convertimos a un array
            const rolesArray = Array.isArray(role) ? role : [role];

            const currentUser = await userModel.findById(userId); // Aseguramos que el `userId` tiene roles válidos
            if (!currentUser) {
                return res.status(404).json({
                    message: "Usuario no encontrado.",
                    error: true,
                    success: false
                });
            }

            // Combinamos los roles existentes con los nuevos, asegurándonos de no duplicar valores
            payload.role = [...new Set([...rolesArray, ...(currentUser.role || [])])];
        }

        // Buscar y actualizar el usuario
        const user = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        // Verificar si el usuario fue encontrado y actualizado
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

