
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const ProductModel = require('../../Models/ProductModel');

const EditProduct = async function (req, res) {
    try {
        console.log("Received Image:", req.file ? req.file.path : "No new image uploaded");

        const { _id } = req.params;
        const date = new Date();

        // Find the existing product
        const existingProduct = await ProductModel.findById(_id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if a new image is uploaded, otherwise keep the old image
        let imagePath = existingProduct.image; // Default to old image
        if (req.file) {
            imagePath = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
        }

        // Update product
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            _id,
            {
                prod_name: req.body.prod_name,
                prod_details: req.body.prod_details,
                prod_price: req.body.prod_price,
                prod_quantity: req.body.prod_quantity,
                prod_total: req.body.prod_price * req.body.prod_quantity,
                prod_date: date,
                image: imagePath,
            },
            { new: true }
        );

        res.status(200).json({
            message: "Product Edited Successfully",
            result: updatedProduct,
        });

    } catch (error) {
        console.error("Error Editing Product:", error);
        res.status(500).json({ message: "Error Editing Product", error });
    }
};

module.exports = EditProduct;
