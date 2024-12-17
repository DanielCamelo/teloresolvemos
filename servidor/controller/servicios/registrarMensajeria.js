const Mensajeria = require("../../models/mensajeriaModel");

const registrarMensajeria = async (req, res) => {
    try {
        const currentUser = req.userId;
        const {
            tipoDePaquete,
            pesoEstimado,
            direccionRecogida,
            direccionEntrega,
            fechaHoraRecogida,
            precio
        } = req.body;

        // Crear el payload con la información para el nuevo registro
        const payload = {
            nombreCliente: currentUser, // Asigna el nombre del cliente a partir del usuario logueado
            tipoDePaquete,
            pesoEstimado,
            direccionRecogida,
            direccionEntrega,
            fechaHoraRecogida,
            estado: 'pendiente',
            precio
        };

        const nuevaOrden = new Mensajeria(payload);
        const ordenGuardada = await nuevaOrden.save();

        return res.json({
            data: ordenGuardada,
            message: "Orden de mensajería registrada exitosamente",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err.message || "Error al registrar la orden de mensajería",
            error: true,
            success: false
        });
    }
};

module.exports = registrarMensajeria;
