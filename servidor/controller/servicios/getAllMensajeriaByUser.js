const Mensajeria = require("../../models/mensajeriaModel");

const getAllMensajeriaByUser = async (request, response) => {
    try {
        const currentUserId = request.userId;  // Obtén el userId del token

        const orderList = await Mensajeria.find({ nombreCliente: currentUserId }).populate('nombreCliente').populate('nombreRepartidor');

        response.json({
            data: orderList,
            message: "Historial de órdenes de mensajería",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = getAllMensajeriaByUser;
