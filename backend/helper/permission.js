const userModel = require("../models/userModel")

const uploadProductPermission = async (id) => {
    const user = userModel.findById(id);
    if(user.role !== 'ADMIN'){
        return false;
    }

    return false;
}

module.exports = uploadProductPermission;