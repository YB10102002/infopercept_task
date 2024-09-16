const mongoose = require("mongoose");

const addToCartTable = new mongoose.Schema({
    productId : {
        ref : "products",
        type : String
    },
    productQty : Number,
    userId : String,
}, {
    timestamps: true
});

const userCartModel = mongoose.model("userCartProduct", addToCartTable);

module.exports = userCartModel;