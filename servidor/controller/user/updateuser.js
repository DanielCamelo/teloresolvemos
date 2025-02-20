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
            if (!currentUser.role.includes("administrador")) {
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

            // 🛠️ CORRECCIÓN: Si `role` viene como string, intenta convertirlo en array
            let newRoles = role;
            if (typeof role === "string") {
                try {
                    newRoles = JSON.parse(role);
                } catch (e) {
                    newRoles = [role]; // Si no se puede parsear, se guarda como array con un solo elemento
                }
            }

            if (!Array.isArray(newRoles)) {
                return res.status(400).json({
                    message: "El campo 'role' debe ser un array.",
                    error: true,
                    success: false
                });
            }

            payload.role = newRoles;
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
