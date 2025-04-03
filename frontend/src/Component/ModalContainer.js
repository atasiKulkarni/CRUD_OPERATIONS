import React from "react";
import "./ModalContainer.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function ModalContainer({ updateMessage }) {
  const Continue = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <div className="common_modal_container">
      <div className="common-modal-sub-container">
        <IoIosCheckmarkCircleOutline color="green" className="modal-icon" />
        <p className="product_add_message">{updateMessage}!!</p>
        <button
          type="button"
          className="continue-button"
          onClick={() => Continue()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
