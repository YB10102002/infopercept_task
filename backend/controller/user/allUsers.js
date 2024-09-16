const user = require("../../models/userModel");

async function allUsersController(req,res) {
    try {
        console.log(req.userId);
        const users = await user.find();
        res.json({
            message : "All Users",
            data : users,
            success : true,
            error : false
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = allUsersController;