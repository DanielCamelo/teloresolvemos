const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId);

    if (user && Array.isArray(user.role) && user.role.includes('administrador')) {
        return true;
    }

    return false;
};

module.exports = uploadProductPermission;

