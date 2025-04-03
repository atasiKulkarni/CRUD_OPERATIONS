import React, { useState, useEffect, useMemo } from "react";
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
      color: "black",
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
            <a href="#edit-modal">
              <button
                className="action_buttons"
                onClick={() => updateProductId(row._id)}
              >
                <BiEdit className="edit-button" />
              </button>
            </a>

            <a href="#delete-modal">
              <button
                className="action_buttons"
                onClick={() => deleteSingleProduct(row._id)}
              >
                <RiDeleteBinFill className="delete-button" />
              </button>
            </a>
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

  function deleteSingleProduct(product_id) {
    updateDeleteId(product_id);
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

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="main-container">
      <div className="sub-container">
        <p className="header-text">CRUD OPERATIONS</p>

        <div className="sub-header-container">
          <div>
            <a href="#open-modal">
              <button
                type="button"
                className="button-container"
                defaultValue="Sign Up"
              >
                + Add Product
              </button>
            </a>
          </div>

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
          paginationRowsPerPageOptions={[
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
          ]}
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          highlightOnHover
          customStyles={customStyles}
          defaultSortFieldId={1}
        />

        <AddProductModal />

        <EditProductModal productId={productId} />

        <DeleteProductModal deleteId={deleteId} />
      </div>
    </div>
  );
}
