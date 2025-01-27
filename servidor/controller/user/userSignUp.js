const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, phone, role, status } = req.body;

        // Validaciones básicas de los campos requeridos
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "Por favor, complete todos los campos requeridos.",
            });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Por favor, introduce un correo electrónico válido.",
            });
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico ya está en uso.",
            });
        }

        // Verificar si el número de teléfono ya está en uso
        const existingPhone = await userModel.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "El número de teléfono ya está en uso.",
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Crear el payload del usuario
        const payload = {
            name,
            email,
            password: hashPassword,
            phone,
            role: role || ["cliente"], // Por defecto, asigna el rol de "cliente"
            status: status || "activo", // Por defecto, el estado es "activo"
        };

        // Guardar el nuevo usuario en la base de datos
        const newUser = new userModel(payload);
        const savedUser = await newUser.save();

        return res.status(201).json({
            data: savedUser,
            success: true,
            message: "Usuario creado exitosamente.",
        });
    } catch (err) {
        console.error("Error en el controlador:", err);
        return res.status(500).json({
            message: "Error del servidor.",
            success: false,
        });
    }
}

module.exports = userSignUpController;

