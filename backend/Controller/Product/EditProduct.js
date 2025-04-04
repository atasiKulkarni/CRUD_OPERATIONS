const path = require("path");
const ProductModel = require("../../Models/ProductModel");

const EditProduct = async function (req, res) {
  try {
    console.log("Received Image:", req.file ? req.file.path : "No new image uploaded");
    const { _id } = req.params;
    const date = new Date();

    // Validate required fields
    const { prod_name, prod_details, prod_price, prod_quantity } = req.body;
    if (!prod_name || !prod_price || !prod_quantity) {
      return res.status(400).json({ message: "Missing required product fields" });
    }

    // Find existing product
    const existingProduct = await ProductModel.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image
    let imagePath = existingProduct.image;
    if (req.file) {
      imagePath = `${process.env.BACKEND_URL}/${path.join("uploads", req.file.filename)}`;
    }

    // Update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      {
        prod_name,
        prod_details,
        prod_price: Number(prod_price),
        prod_quantity: Number(prod_quantity),
        prod_total: Number(prod_price) * Number(prod_quantity),
        prod_date: date,
        image: imagePath,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product Edited Successfully",
      result: updatedProduct,
    });

  } catch (error) {
    console.error("Error Editing Product:", error);
    return res.status(500).json({ message: "Error Editing Product", error });
  }
};

module.exports = EditProduct;
