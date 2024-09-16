const productModel = require("../../models/productModel");

const getCategoryWiseProductController = async (req, res) => {
    try {
        // Extract category from the request body or query
        const category = req.body.category || req.query.category;
        //console.log("backend",category);
        // Check if the category is a string (optional but recommended)
        if (typeof category !== 'string') {
            throw new Error("Invalid category value. Expected a string.");
        }

        // Fetch products based on the category
        const products = await productModel.find({ productCategory: category });

        // Send the response
        res.json({
            data: products,
            error: false,
            success: true,
            message: "Products retrieved successfully"
        });
    } catch (err) {
        console.error(err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getCategoryWiseProductController;
