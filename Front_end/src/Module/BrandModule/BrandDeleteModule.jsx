import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BrandDeleteModule = ({ Show, handleClose, brand, handleBrandDelete }) => {
  console.log("function is call BrandDeleteModule",brand);
  
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
    return null;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/brand/deleteBrand/${brand.brand_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      handleBrandDelete(brand.brand_id);
      handleClose();
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Failed to delete brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        {brand ? `Are you sure you want to delete the ${brand.brand_name} brand?` : "Brand not found"}
      </Modal.Body>
      <Modal.Footer>
        
        <Button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BrandDeleteModule;
