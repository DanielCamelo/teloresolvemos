const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId; // ID del usuario autenticado (esto debería provenir de un middleware de autenticación)
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

        if (email) {
            payload.email = email; // Actualiza el email si se proporciona
        }

        if (name) {
            payload.name = name; // Actualiza el nombre si se proporciona
        }

        if (status) {
            payload.status = status; // Actualiza el estado si se proporciona
        }

        // Si se proporciona un nuevo rol, agrega o elimina según corresponda
        if (role) {
            const currentUser = await userModel.findById(userId); // Aseguramos que el `userId` tiene roles válidos
            if (!currentUser) {
                return res.status(404).json({
                    message: "Usuario no encontrado.",
                    error: true,
                    success: false
                });
            }

            // Si el rol ya existe, eliminarlo; si no existe, agregarlo
            const rolesArray = Array.isArray(currentUser.role) ? currentUser.role : [];
            if (rolesArray.includes(role)) {
                // Elimina el rol existente
                payload.role = rolesArray.filter(r => r !== role);
            } else {
                // Agrega el rol al array
                payload.role = [...rolesArray, role];
            }
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


