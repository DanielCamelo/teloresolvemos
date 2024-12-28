const Domicilios = require("../../models/domiciliosModel");

const getAllDomicilioByUser = async (request , response) => {

    try {
        const currentUserId = request.userId;  // Obtén el userId del token

        const orderList = await Domicilios.find({ nombreCliente: currentUserId }).populate('nombreCliente').populate('nombreRepartidor');


        response.json({
            data: orderList,
            message: "Historial de pedidos de domicilio",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = getAllDomicilioByUser