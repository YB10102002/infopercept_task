const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helper/permission");
const upload = require('../../middleware/multer'); // Ensure correct path

async function UploadProductsFromFileController(req, res) {
    try {
        const sessionID = req.userID;

        if (!uploadProductPermission(sessionID)) {
            throw new Error("Permission denied.");
        }

        if (!req.file) {
            throw new Error("No file uploaded.");
        }

        const products = [];
        const filePath = path.join(__dirname, '../../uploads/', req.file.filename);
       // console.log("filepath",filePath);

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                products.push({
                    productName: row.productName,
                    brandName: row.brandName,
                    productCategory: row.productCategory,
                    productImage: [row.productImage], // Assuming a single image
                    description: row.description,
                    price: isNaN(parseFloat(row.price)) ? 0 : parseFloat(row.price),
                    sellingPrice: isNaN(parseFloat(row.sellingPrice)) ? 0 : parseFloat(row.sellingPrice),
                });
            })
            .on('end', async () => {
                try {
                    // Insert products into the database
                    const saveProducts = await productModel.insertMany(products);

                    // Optionally delete the file after processing
                    fs.unlinkSync(filePath);

                    res.status(201).json({
                        message: "Products added successfully.",
                        error: false,
                        success: true,
                        data: saveProducts,
                    });
                } catch (err) {
                    res.status(400).json({
                        message: err.message || err,
                        error: true,
                        success: false,
                    });
                }
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductsFromFileController;
