
const productModel = require("../../models/productModel");
const fs = require('fs');
const csv = require('csv-parser');

async function UploadProductController(req,res){
    try {
        if (!req.file) {
          return res.status(400).json({
            message: "No file uploaded",
            error: true,
            success: false
          });
        }
    
        const results = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            try {
              const insertedProducts = [];
    
              for (const product of results) {
                // Check if the product already exists in the database
                const existingProduct = await productModel.findOne(product);
                if (!existingProduct) {
                  const newProduct = new productModel(product);
                  await newProduct.save();
                  insertedProducts.push(newProduct);
                }
              }
    
              res.status(201).json({
                message: `${insertedProducts.length} products imported successfully`,
                error: false,
                success: true,
              });
            } catch (err) {
              console.error(err);
              res.status(400).json({
                message: 'Error importing products',
                error: true,
                success: false,
              });
            }
          });
      } catch (err) {
        console.error(err);
        res.status(400).json({
          message: 'Error importing products',
          error: true,
          success: false,
        });
    }
};
module.exports = UploadProductController;