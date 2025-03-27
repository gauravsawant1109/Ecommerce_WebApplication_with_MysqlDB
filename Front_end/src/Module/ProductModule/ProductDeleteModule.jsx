import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProductDeleteModule = ({ Show, SelectedProduct, handleProductDelete, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/deleteProduct/${SelectedProduct.product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      handleProductDelete(SelectedProduct.product_id);
    } catch (error) {
      console.error("Error in Deleting Product:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {SelectedProduct
          ? `Are you sure you want to delete ${SelectedProduct.product_name}?`
          : "Product not found"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDeleteModule;
