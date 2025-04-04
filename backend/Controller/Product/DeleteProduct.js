const ProductModel = require('../../Models/ProductModel');

const DeleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params._id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product Not Found",
        error_code: 404,
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
      error_code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Product",
      error,
    });
  }
};

module.exports = DeleteProduct;
