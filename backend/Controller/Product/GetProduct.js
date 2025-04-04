const ProductModel = require('../../Models/ProductModel');

const GetProduct = async function (req, res) { 
    try {
        const products = await ProductModel.find()
            .sort({ _id: -1 }) // Sort by latest
            .select("-__v");   // Exclude __v field (Mongo version key)

        res.status(200).json({ result: products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = GetProduct;
