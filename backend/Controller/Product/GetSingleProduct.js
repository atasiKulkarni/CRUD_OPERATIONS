const ProductModel = require('../../Models/ProductModel');

const GetSingleProduct = async function (req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).select("-__v");

    if (!product) {
      return res.status(404).send({
        message: "Product not found",
        error_code: 404
      });
    }

    res.status(200).send({
      message: "Product Details",
      error_code: 200,
      result: product
    });

  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).send({
      message: "Error getting product",
      error
    });
  }
};

module.exports = GetSingleProduct;
