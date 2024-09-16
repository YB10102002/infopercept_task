const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
async function userResgisterController (req,res) {
    try{
        const { name ,email , password } = req.body;
        //console.log(req.body);
        const user = await userModel.findOne({email});
        //console.log(user);
        if(user){
            throw new Error("already user created with this email.")
        }
        if(!email){
            throw new Error("please provide an email.")
        }
        if(!password){
            throw new Error("please provide a password.")
        }
        if(!name){
            throw new Error("please provide a name.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashP =  await bcrypt.hashSync(password,salt);
        if(!hashP){
            throw new Error("Something is wrong ! please try after some time.")
        }
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashP
        }
        const data = new userModel(payload) 
        const savedUser = await data.save();
        res.status(200).json({
            data : savedUser,
            success : true,
            error : false,
            message : "User Created Successfully."
        })
    }catch(err){
        console.log(err);
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = userResgisterController;