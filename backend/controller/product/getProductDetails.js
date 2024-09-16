const productModel = require("../../models/productModel");

const getProductDetailsController = async(req,res) => {
    try{
        const { id } = req.body;
        console.log(id);
        const product = await productModel.findById(id);
        //console.log(product);
        res.json({
            message : "Product Details",
            data : product,
            error : false,
            success : true
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

module.exports = getProductDetailsController;