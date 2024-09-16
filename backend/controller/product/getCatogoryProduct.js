const productModel = require("../../models/productModel");

const getCatogoryProduct = async(req,res) => {
    try{
        const productC = await productModel.distinct("productCategory");

        console.log(productC);
        //array to store one product from each category
        const productByCategory = [];
        for(const category of productC){
            const product = await productModel.findOne({productCategory : category });

            if(product){
                productByCategory.push(product);
            }
        }

        res.json({
            message : "Category Product.",
            error : false,
            success : true,
            data : productByCategory
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

module.exports = getCatogoryProduct;