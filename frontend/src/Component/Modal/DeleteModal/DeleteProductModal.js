import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import $ from "jquery";
import axios from "axios";
import "../DeleteModal/DeleteProductModal.css";

export default function DeleteProductModal(deleteId) {
  const productId = deleteId.deleteId;
  const [deleteMessage, updateDeleteMessage] = useState("");

  function closeDeleteModal() {
    $("#delete-modal").hide();
  }

  async function deleteProduct() {
    const userResponse = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/delete_product/${productId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    updateDeleteMessage(userResponse.data.message);
    if (userResponse.data.error_code === 200) {
      setTimeout(() => {
        $("#delete_modal").hide();
        window.location.href = "/";
      }, 1000);
    }
  }

  return (
    <div
      id="delete-modal"
      class="modal-window"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div style={{ width: "35%", fontFamily: "Poppins" }}>
        <div className="delete-product-modal-header">
          <h1 className="delete-product-header-text">DELETE PRODUCT</h1>
          <a href="./" title="Close" class="delete-modal-close">
            <GrFormClose className="delete-close-icon" />
          </a>
        </div>

        <p style={{ fontSize: "14PX", margin: "0px", textAlign: "center" }}>
          Are You Sure You want to Delete This Product?
        </p>
        <p style={{ fontSize: "14PX", margin: "0px", textAlign: "center" }}>
          This will delete your product from catlog
        </p>
        
        <div className="d-flex buttons-container">
          {/* cancel */}
          <a href="./" title="Close" class="delete-modal-cancel">
            <button
              type="button"
              className="cancel-button-container"
              onClick={() => closeDeleteModal()}
            >
              Cancel
            </button>
          </a>

          {/* yes delete it */}
          <button
            type="button"
            className="delete-button-container"
            onClick={() => deleteProduct()}
            defaultValue="Sign Up"
          >
            Yes, Delete It!
          </button>
        </div>

        <p style={{ fontSize: "16px", fontWeight: "500", color: "#1e90ff" }}>
          {deleteMessage}
        </p>
      </div>
    </div>
  );
}
