const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProductController (req,res) {
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied.")
        }
        const {_id , resBody} = req.body;
        // const productID = req?._id;
        const updateProduct = await productModel.findByIdAndUpdate(
            _id, 
            resBody, 
        );

        res.json({
            message : "Product Updated Successfully.",
            data : updateProduct,
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

module.exports = updateProductController;