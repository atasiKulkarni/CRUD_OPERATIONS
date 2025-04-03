import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import "../AddProduct/AddProductModal.css";

export default function AddProductModal({ setMessage }) {
  const [prodName, updateProdName] = useState("");
  const [prodImage, updateProdImage] = useState("");
  const [prodDetails, updateProdDetails] = useState("");
  const [prodPrice, updateProdPrice] = useState("");
  const [prodQuantity, updateProdQuantity] = useState("");
  const [prodTotal, updateProdTotal] = useState("");

  function totalPrice(e) {
    updateProdQuantity(e.target.value);
    const total_price = prodPrice * e.target.value;
    updateProdTotal(total_price);
  }

  // add products API
  async function addProductDetails() {
    const formData = new FormData();
    formData.append("prod_name", prodName);
    formData.append("image", prodImage);
    formData.append("prod_details", prodDetails);
    formData.append("prod_price", prodPrice);
    formData.append("prod_quantity", prodQuantity);
    formData.append("prod_total", prodTotal);

    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "add_product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.error_code === 200) {
      setMessage(response.data.message); // Send message to Home.js
    } else {
      setMessage("Failed to add product.");
    }
  }

  return (
    <div className="add_product_modal">
      <div className="add-product-modal-container">
        <div className="add-product-modal-header">
          <h1 className="add-product-header-text">ADD PRODUCT</h1>
          <a href="./" title="Close" class="delete-modal-close">
            <GrFormClose className="close-icon" />
          </a>
        </div>

        <form className="product_form mt-3">
          <div class="mb-1">
            <label for="product_name" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control add_product"
              id="product_name"
              value={prodName}
              onChange={(e) => updateProdName(e.target.value)}
            />
          </div>

          <div class="mb-1">
            <label for="product_image" class="form-label">
              Product Image
            </label>
            {prodImage && (
              <img
                src={
                  typeof prodImage === "string"
                    ? prodImage
                    : URL.createObjectURL(prodImage)
                }
                alt="Product Preview"
                className="preview_image"
              />
            )}
            <input
              type="file"
              class="form-control add_product"
              id="product_image"
              onChange={(e) => updateProdImage(e.target.files[0])}
            />
          </div>

          <div class="mb-1">
            <label for="product_details" class="form-label">
              Product Details
            </label>
            <textarea
              class="form-control add_product"
              id="product_details"
              value={prodDetails}
              onChange={(e) => updateProdDetails(e.target.value)}
            />
          </div>

          <div class="mb-1">
            <label for="product_price" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control add_product"
              id="product_price"
              value={prodPrice}
              onChange={(e) => updateProdPrice(e.target.value)}
            />
          </div>

          <div class="mb-1">
            <label for="product_quantity" class="form-label">
              Quantity
            </label>
            <input
              type="number"
              class="form-control add_product"
              id="product_quantity"
              value={prodQuantity}
              onChange={totalPrice}
            />
          </div>

          <div class="mb-1">
            <label for="product_total" class="form-label">
              Total
            </label>
            <input
              type="number"
              class="form-control add_product"
              id="product_total"
              value={prodTotal}
              onChange={(e) => updateProdTotal(e.target.value)}
            />
          </div>

          <div className="modal-button">
            <button
              type="button"
              className="add-button-container "
              onClick={() => addProductDetails()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
