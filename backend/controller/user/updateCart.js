const userCartModel = require("../../models/userCartModel");

const updateCartContorller = async(req,res) => {
    try{
        const currentUser = req.userId;
        const cartProductId = req.body._id;

        const qty = req.body.productQty;

        const updateCart = await userCartModel.updateOne({_id : cartProductId},{
            ...(qty && {productQty : qty})
        });

        res.json({
            message : "Cart Updated!!!",
            data : updateCart,
            success : true,
            error : false
        })
    }catch(err){
        console.log(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateCartContorller;