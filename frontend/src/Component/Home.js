import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import "../App.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import moment from "moment";
import AddProductModal from "./Modal/AddProduct/AddProductModal";
import EditProductModal from "./Modal/EditModal/EditProductModal";
import DeleteProductModal from "./Modal/DeleteModal/DeleteProductModal";
import ModalContainer from "./ModalContainer";
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const customStyles = {
  rows: {
    style: {
      padding: "10px",
      border: "none",
    },
  },

  head: {
    style: {
      padding: "10px",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#4d4d80",
      fontFamily: "Poppins",
    },
  },
  table: {
    style: {
      padding: "0",
      margin: "0px auto",
      width: "100%",
      fontSize: "12PX",
      fontFamily: "Poppins",
    },
  },
};

export function Home() {
  const [data, setData] = useState([]);
  const [productId, updateProductId] = useState("");
  const [deleteId, updateDeleteId] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [message, updateMessage] = useState(""); // State to store message
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);

  const EditProduct = (productId) => {
    setShowEditProductModal(true);
    updateProductId(productId);
  };
  function deleteSingleProduct(product_id) {
    setShowDeleteProductModal(true);
    updateDeleteId(product_id);
  }
  const columns = [
    {
      name: "Image",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div>
            <img src={row.image} alt="upload" className="uploaded_image" />
          </div>
        );
      },
    },
    {
      name: "Product Name",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.prod_name}</div>;
      },
    },
    {
      name: "Detail",
      selector: "publish_date",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.prod_details}</div>;
      },
    },
    {
      name: "Price",
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.prod_price}</div>;
      },
    },
    {
      name: "Quantity",
      selector: "publish_date",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.prod_quantity}</div>;
      },
    },
    {
      name: "Total Price",
      selector: "prod_total",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return <div>{row.prod_total}</div>;
      },
    },

    {
      name: "Created Date",
      selector: "publish_date",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        const ProductDate = moment(row.prod_date).format("DD-MM-YYYY");
        return <div>{ProductDate}</div>;
      },
    },

    {
      name: "Action",
      sortable: true,
      wrap: true,
      width: "auto",
      cell: (row) => {
        return (
          <div className="action-container">
            {/* edit button */}
            <button
              className="action_buttons"
              onClick={() => EditProduct(row._id)}
            >
              <BiEdit className="edit-button" />
            </button>

            {/* delete button */}
            <button
              className="action_buttons"
              onClick={() => deleteSingleProduct(row._id)}
            >
              <RiDeleteBinFill className="delete-button" />
            </button>
          </div>
        );
      },
    },
  ];

  // get all product details
  async function fetchProductDetails() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}/get_all_product`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setData(response.data.result);
  }

  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  function handleAddProductSubmit(msg) {
    updateMessage(msg);
    setShowAddProductModal(false);
    setShowMessageModal(true);
  }

  function handleEditProductSubmit(msg) {
    updateMessage(msg);
    setShowEditProductModal(false);
    setShowMessageModal(true);
  }

  function handleDeleteProductSubmit(msg) {
    updateMessage(msg);
    setShowDeleteProductModal(false);
    setShowMessageModal(true);
  }
  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="main-container">
      <div className="sub-container">
        <p className="header-text">CRUD OPERATIONS</p>

        <div className="sub-header-container">
          <button
            type="button"
            className="button-container"
            onClick={() => setShowAddProductModal(true)}
          >
            + Add Product
          </button>

          {/* serach box */}
          <div className="search-container">
            <IoSearch className="search_image" />
            <Input
              id="search"
              type="text"
              placeholder="Search By Project"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="search-input-container"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredItems}
          striped
          paginationPerPage={10}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          customStyles={customStyles}
          defaultSortFieldId={1}
        />

        {showAddProductModal && (
          <AddProductModal setMessage={handleAddProductSubmit} />
        )}

        {showEditProductModal && (
          <EditProductModal
            setMessage={handleEditProductSubmit}
            productId={productId}
          />
        )}

        {showDeleteProductModal && (
          <DeleteProductModal
            deleteId={deleteId}
            setMessage={handleDeleteProductSubmit}
          />
        )}

        {showMessageModal && <ModalContainer updateMessage={message} />}
      </div>
    </div>
  );
}
