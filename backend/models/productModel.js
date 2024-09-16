const mongoose = require("mongoose");

const productTable = new mongoose.Schema({
    productName: String,
    brandName: String,
    productCategory: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, {
    timestamps: true
});

const productModel = mongoose.model("products", productTable);

module.exports = productModel;