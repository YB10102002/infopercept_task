const userCartModel = require("../../models/userCartModel");

const viewCartProductController = async(req,res) => {
    try{
        const id = req.userId;

        const products = await userCartModel.find({userId : id}).populate("productId");

        res.json({
            message : "User Cart Products",
            data : products,
            success : true,
            error : false

        });

    }catch(err){
        console.log(err);
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = viewCartProductController;