const Domicilio = require("../../models/domiciliosModel");

const getDomicilioByUserIdAndOrderId = async (request, response) => {
    try {
        const { orderId } = request.params;  // Obtén el orderId de los parámetros
        const currentUserId = request.userId;  // Obtén el userId del token

        const order = await Domicilio.findOne({ _id: orderId, nombreCliente: currentUserId }).populate('nombreCliente').populate('nombreRepartidor');

        if (!order) {
            return response.status(404).json({
                message: 'Orden no encontrada para el cliente actual'+currentUserId,
                error: true
            });
        }

        response.json({
            data: order,
            message: "Detalles de pedido de domicilio",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = getDomicilioByUserIdAndOrderId;