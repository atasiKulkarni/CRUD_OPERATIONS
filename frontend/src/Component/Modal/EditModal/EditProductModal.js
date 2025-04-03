import React, { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import $ from "jquery";
import axios from "axios";
import "../EditModal/EditProductModal.css";

export default function EditProductModal(productId) {
  const [prodName, updateProdName] = useState("");
  const [prodImage, updateProdImage] = useState("");
  const [prodDetails, updateProdDetails] = useState("");
  const [prodPrice, updateProdPrice] = useState("");
  const [prodQuantity, updateProdQuantity] = useState("");
  const [prodTotal, updateProdTotal] = useState("");
  const [editMessage, updateEditMessage] = useState("");
  const Product_Id = productId.productId;

  function totalPrice(e) {
    updateProdQuantity(e.target.value);
    const total_price = prodPrice * e.target.value;
    updateProdTotal(total_price);
  }

  // get single product details API
  async function getSingleProductDetail() {
    const userResponse = await axios.get(
      `${process.env.REACT_APP_API_KEY}/get_single_product/${Product_Id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (userResponse.data.error_code === 200) {
      const prodResult = userResponse.data.result;
      updateProdName(prodResult.prod_name);
      updateProdImage(prodResult.image);
      updateProdDetails(prodResult.prod_details);
      updateProdPrice(prodResult.prod_price);
      updateProdQuantity(prodResult.prod_quantity);
      updateProdTotal(prodResult.prod_total);
    }
  }

  // edit product details API
  async function editDetails() {
    const formData = new FormData();
    formData.append("prod_name", prodName);
    formData.append("image", prodImage);
    formData.append("prod_details", prodDetails);
    formData.append("prod_price", prodPrice);
    formData.append("prod_quantity", prodQuantity);
    formData.append("prod_total", prodTotal);
    const userEditResponse = await axios.put(
      `${process.env.REACT_APP_API_KEY}/edit_product/${Product_Id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    updateEditMessage(userEditResponse.data.message);
    if (userEditResponse.status === 200) {
      setTimeout(() => {
        $("#edit-modal").hide();
        window.location.href = "/";
      }, 1000);
    }
  }

  useEffect(() => {
    if (Product_Id) {
      getSingleProductDetail();
    }
  }, [Product_Id]);

  return (
    <div id="edit-modal" class="modal-window">
      <div className="edit-product-modal-container">
        <div className="edit-product-modal-header">
          <h1 className="edit-product-header-text">EDIT PRODUCT</h1>
          <a href="./" title="Close" class="modal-close">
            <GrFormClose className="close-icon " />
          </a>
        </div>

        <form className="student_form mt-3">
          <div class="mb-1">
            <label for="product_name" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control edit_product"
              id="product_name"
              value={prodName}
              onChange={(e) => updateProdName(e.target.value)}
            />
          </div>

          <div class="mb-1">
            <label for="product_image" class="form-label">
              Product Image
            </label>

 {/* Show existing image if available */}
 {prodImage && (
    <img
      src={typeof prodImage === "string" ? prodImage : URL.createObjectURL(prodImage)}
      alt="Product Preview"
      style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px", display: "block" }}
    />
  )}

            <input
              type="file"
              class="form-control edit_product"
              id="product_image"
              // value={prodImage}
              onChange={(e) => updateProdImage(e.target.files[0])}
            />
          </div>

          <div class="mb-1">
            <label for="product_details" class="form-label">
              Product Details
            </label>
            <input
              type="text"
              class="form-control edit_product"
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
              type="text"
              class="form-control edit_product"
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
              class="form-control edit_product"
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
              type="text"
              class="form-control edit_product"
              id="product_total"
              value={prodTotal}
              onChange={() => updateProdTotal()}
            />
          </div>

          <div className="modal-button">
            <button
              type="button"
              className="edit-button-container "
              onClick={() => editDetails()}
              defaultValue="Sign Up"
            >
              Update
            </button>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1e90ff",
            }}
          >
            {editMessage}
          </p>
        </form>
      </div>
    </div>
  );
}
