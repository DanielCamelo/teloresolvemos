const userModel = require("../../models/userModel");

const deleteUser = async (req, res) => {
    try {
        const currentUserId = req.userId; // ID del usuario que está haciendo la solicitud
        const userModelId = req.body._id; // ID del usuario a eliminar

        // Validar que el ID del usuario a eliminar es proporcionado
        if (!userModelId) {
            return res.status(400).json({
                message: "El ID del usuario es requerido.",
                error: true,
                success: false
            });
        }

        // Validar si el usuario que solicita tiene permiso para eliminar
        if (currentUserId === userModelId) {
            return res.status(403).json({
                message: "No puedes eliminar tu propio usuario.",
                error: true,
                success: false
            });
        }

        // Intentar eliminar el usuario
        const deleteResult = await userModel.deleteOne({ _id: userModelId });

        // Comprobar si se eliminó algún documento
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
                error: true,
                success: false
            });
        }

        // Respuesta en caso de éxito
        return res.status(200).json({
            message: "Usuario eliminado exitosamente.",
            error: false,
            success: true
        });
    } catch (error) {
        // Manejo de errores
        console.error("Error eliminando el usuario:", error);
        return res.status(500).json({
            message: "Ocurrió un error eliminando el usuario.",
            error: true,
            success: false
        });
    }
};

module.exports = deleteUser;

