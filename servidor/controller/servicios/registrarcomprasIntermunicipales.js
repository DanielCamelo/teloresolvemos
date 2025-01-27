const ComprasIntermunicipales = require("../../models/comprasIntermunicipalesModel");

const registrarComprasIntermunicipales = async (req, res) => {
    try {
        const currentUser = req.userId;
        const {
            productos,
            ubicacionCompra,
            direccionEntrega,
            presupuestoMaximo,
            fechaHoraEntrega,
            precio
        } = req.body;

        // Crear el payload con la información para el nuevo registro
        const payload = {
            nombreCliente: currentUser, // Asigna el nombre del cliente a partir del usuario logueado
            productos,
            ubicacionCompra,
            direccionEntrega,
            presupuestoMaximo,
            fechaHoraEntrega,
            estado: 'pendiente',
            precio
        };

        const nuevaOrden = new ComprasIntermunicipales(payload);
        const ordenGuardada = await nuevaOrden.save();

        return res.json({
            data: ordenGuardada,
            message: "Orden de Compras Intermunicipales registrada exitosamente",
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

module.exports = registrarComprasIntermunicipales;