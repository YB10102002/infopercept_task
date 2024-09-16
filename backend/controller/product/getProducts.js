const productModel = require("../../models/productModel");

const getProductsController = async (req,res) => {
    try{
        const products = await productModel.find().sort({createdAt : -1});

        res.json({
            message : "All Products",
            success : true,
            error : false,
            data : products
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

module.exports = getProductsController;