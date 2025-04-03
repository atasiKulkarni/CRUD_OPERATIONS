import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import $ from "jquery";
import "../AddProduct/AddProductModal.css";

export default function AddProductModal() {
  const [prodName, updateProdName] = useState("");
  const [prodImage, updateProdImage] = useState("");
  const [prodDetails, updateProdDetails] = useState("");
  const [prodPrice, updateProdPrice] = useState("");
  const [prodQuantity, updateProdQuantity] = useState("");
  const [prodTotal, updateProdTotal] = useState("");
  const [message, updateMessage] = useState("");

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

    const userResponse = await axios.post(
      process.env.REACT_APP_API_KEY + "add_product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    updateMessage(userResponse.data.message);
    if (userResponse.data.error_code === 200) {
      setTimeout(() => {
        $("#open-modal").hide();
        window.location.href = "/";
      }, 1000);
    }
  }

  return (
    <div id="open-modal" className="modal-window">
      <div className="add-product-modal-container">
        <div className="add-product-modal-header">
          <h1 className="add-product-header-text">ADD PRODUCT</h1>
          <a href="./" title="Close" class="delete-modal-close">
            <GrFormClose className="close-icon " />
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
      src={typeof prodImage === "string" ? prodImage : URL.createObjectURL(prodImage)}
      alt="Product Preview"
      style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px", display: "block" }}
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
              style={{ height: "30px" }}
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
            <a href="#open-modal" style={{ width: "100%" }}>
              <button
                type="button"
                className="add-button-container "
                onClick={() => addProductDetails()}
                defaultValue="Sign Up"
              >
                Submit
              </button>
            </a>
          </div>

          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#1e90ff",
            }}
          >
            {message}
          </p>
        </form>
      </div>
    </div>
  );
}
