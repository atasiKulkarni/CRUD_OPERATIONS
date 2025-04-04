const ProductModel = require('../../Models/ProductModel');

const AddProduct = async (req, res) => {
  try {
    const { prod_name, prod_details, prod_price, prod_quantity } = req.body;

    // Check if product already exists
    const existingProduct = await ProductModel.findOne({ prod_name });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product Already Exists",
        error_code: 400,
      });
    }

    const date = new Date();

    // Build new product object
    const newProduct = new ProductModel({
      prod_name,
      prod_details,
      prod_price,
      prod_quantity,
      prod_total: prod_price * prod_quantity,
      prod_date: date,
      image: process.env.BACKEND_URL + req.file?.path, // added optional chaining
    });

    // Save to DB
    const savedProduct = await newProduct.save();

    return res.status(200).json({
      message: "Product Added Successfully",
      error_code: 200,
      result: savedProduct,
    });

  } catch (error) {
    console.error("Error while creating product:", error);
    return res.status(500).json({
      message: "Error Creating Product",
      error,
    });
  }
};

module.exports = AddProduct;
