const productModel = require("../../models/productModel");

const searchProductController = async (req,res) => {
    try{

        const qry = req.query.q;
       // console.log(qry);
       const regex = new RegExp(qry,'i','g');

       const products = await productModel.find({
        "$or":[
            {
                productName : regex
            },
            {
                productCategory : regex 
            }
        ]
       });

       res.json({
        data : products,
        message : "Search Product Details",
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

module.exports = searchProductController;