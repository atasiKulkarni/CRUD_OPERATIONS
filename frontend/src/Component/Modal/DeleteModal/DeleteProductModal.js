import React from "react";
import axios from "axios";
import "../DeleteModal/DeleteProductModal.css";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteProductModal({ deleteId, setMessage }) {
  const productId = deleteId;

  async function deleteProduct() {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/delete_product/${productId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.error_code === 200) {
      setMessage(response.data.message); // Send message to Home.js
    } else {
      setMessage("Failed to delete product.");
    }
  }

  return (
    <div class="delete_product_modal">
      <div className="delete-product-modal-container">
        <div className="delete-product-modal-header">
          <RiDeleteBinLine
            color="red"
            style={{ width: "45px", height: "45px", alignSelf: "center" }}
          />
        </div>
        <div style={{ margin: "15px 5px" }}>
          <p
            style={{
              fontSize: "14PX",
              margin: "0px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Are You Sure You want to Delete This Product?
          </p>
          <p
            style={{
              fontSize: "13PX",
              margin: "0px",
              textAlign: "center",
              color: "gray",
              fontWeight: "500",
            }}
          >
            This will delete your product from catlog
          </p>
        </div>

        <div className="d-flex buttons-container">
          {/* cancel */}
          <a href="./" title="Close" class="delete-modal-cancel">
            <button type="button" className="cancel-button-container">
              Cancel
            </button>
          </a>

          {/* yes delete it */}
          <button
            type="button"
            className="delete-button-container"
            onClick={() => deleteProduct()}
          >
            Yes, Delete It!
          </button>
        </div>
      </div>
    </div>
  );
}
