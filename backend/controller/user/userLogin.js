const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
async function userLoginController(req, res) {
    try {
        const email = req.body.emaill;
        const password = req.body.passwordd;

        if (!email) {
            throw new Error("please provide an email.")
        }
        if (!password) {
            throw new Error("please provide a password.")
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        //console.log(checkPassword);
        if (checkPassword) {
            const tokenData = {
                _id : user._id,
                email : user.email
            }
           const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });
           const tokenOption = {
                httpOnly : true,
                secure : true
           }
           res.cookie("token",token,tokenOption).json({
                message : "Login successfully.",
                data : token,
                success : true,
                error : false
           })
        } else {
            throw new Error("Incorrect password.")
        }

    } catch (err) {
        console.log(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userLoginController;