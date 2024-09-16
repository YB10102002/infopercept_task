const productModel = require("../../models/productModel");

const filterProductController = async(req,res) => {
    try{

        const categoryList = req?.body?.category || []

        const products = await productModel.find({
            productCategory : {
                "$in" : categoryList
            }
        });

        res.json({
            message : "Filtered Data.",
            data : products,
            error : false,
            success : true
        })

    }catch(err){
        console.error(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = filterProductController;