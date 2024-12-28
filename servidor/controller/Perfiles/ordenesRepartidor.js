const mensajeriaModel = require('../../models/mensajeriaModel'); // Modelo de órdenes de mensajería
const usuarioModel = require('../../models/userModel'); // Modelo de usuarios

// Controlador para obtener todas las órdenes vinculadas a un repartidor
const getOrdenesPorRepartidor = async (req, res) => {
    try {
        // Obtener la información del usuario desde el token
        const currentUserId = req.userId;  // Obtén el userId del token

        // Verificar que el usuario tenga el rol de repartidor
        const usuario = await usuarioModel.findById(currentUserId);
        if (!usuario || !usuario.role.includes('repartidor')) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. No tienes permisos para ver estas órdenes.'
            });
        }

        // Buscar órdenes donde el usuario sea el repartidor
        const ordenes = await mensajeriaModel.find({ nombreRepartidor: currentUserId }).populate('nombreCliente').populate('nombreRepartidor');

        // Responder con las órdenes encontradas
        return res.status(200).json({
            success: true,
            message: 'Órdenes obtenidas exitosamente.',
            data: ordenes
        });
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor. Intenta nuevamente más tarde.'
        });
    }
};


module.exports = getOrdenesPorRepartidor ;