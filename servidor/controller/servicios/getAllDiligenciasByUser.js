const Diligencias = require("../../models/diligenciasModel");

const getAllDiligenciasByUser = async (request , response) => {

    try {
        const currentUserId = request.userId;  // Obtén el userId del token

        const orderList = await Diligencias.find({ nombreCliente: currentUserId }).populate('nombreCliente').populate('nombreRepartidor');


        response.json({
            data: orderList,
            message: "Historial de pedidos de diligencias",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = getAllDiligenciasByUser