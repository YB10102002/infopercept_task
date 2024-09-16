const userCartModel = require("../../models/userCartModel");

const addToCartController = async (req, res) => {
    try {
        const { pid } = req.body;
        const currentUser = req.userId;
        const isAvailable = await userCartModel.findOne({ productId : pid });

        console.log(isAvailable);

        if(isAvailable){
            return res.json({
                message : "product already exits in cart!",
                success : false,
                error : true
            })
        }


        const payload = {
            productId: pid,
            productQty: 1,
            userId: currentUser,
        }

        const newAddToCart = new userCartModel(payload);
        const saveData = await newAddToCart.save();

        return res.json({
            message : "Added to the Cart!",
            data : saveData,
            success : true,
            error : false
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

module.exports = addToCartController;