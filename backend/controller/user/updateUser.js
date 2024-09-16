const userModel = require("../../models/userModel");


async function updateUserController(req,res) {
    try {

        const sessionUser = req.userId;
        const { id , email , name , role } = req.body;
        const payload =  {
            ...(email && { email : email }),
            ...(name && { name : name }),
            ...(role && { role : role }),
        } 

        const user = await userModel.findById(sessionUser);
        console.log(user.role);
        const updatedUser = await userModel.findByIdAndUpdate(id,payload);
        res.json({
            message : "User updated successfully.",
            error : false,
            success : true,
            data : updatedUser
        });

    } catch (err) {
        console.log(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
// export default updateUserController;

module.exports = updateUserController;