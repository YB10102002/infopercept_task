const userCartModel = require("../../models/userCartModel");

const deleteCartController = async (req, res) => {
    try {

        const currentUser = req.userId;

        const cartProduct = req.body._id;

        const deleteCart = await userCartModel.deleteOne({_id : cartProduct});

        res.json({
            message : "Cart Deleted!!!",
            data : deleteCart,
            error : false,
            success : true
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

module.exports = deleteCartController;