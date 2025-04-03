const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        prod_name: { type: String, required: true },
        image: { type: String },
        prod_details: { type: String, required: true },
        prod_price: { type: Number, required: true },
        prod_quantity: { type: Number, required: true },
        prod_total: { type: Number, required: true },
    },
    { collection: "product_list" }
);

module.exports = mongoose.model("Product", ProductSchema);
