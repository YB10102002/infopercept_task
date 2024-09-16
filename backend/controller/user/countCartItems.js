const userCartModel = require("../../models/userCartModel");

const countCartItemsController = async(req,res) => {
    try{
        const currentUser = req.userId;
        const count = await userCartModel.countDocuments({
            userId : currentUser
        });
        res.json({
            data : {
                total : count
            },
            message : "Total Products",
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

module.exports = countCartItemsController;