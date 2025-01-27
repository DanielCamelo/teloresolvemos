const TransporteParticular = require("../../models/transporteParticulaModel");

const getAllTransporteParticularByUser = async (request, response) => {
    try {
        const currentUserId = request.userId;  // Obtén el userId del token

        const orderList = await TransporteParticular.find({ nombreCliente: currentUserId }).populate('nombreCliente').populate('nombreChofer');

        response.json({
            data: orderList,
            message: "Historial de órdenes de transporte particular",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = getAllTransporteParticularByUser;