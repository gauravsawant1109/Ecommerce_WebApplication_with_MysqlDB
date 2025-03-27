import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
const CategoryDeleteModule = ({ Show, handleClose, category, handleCategoryDelete }) => {
  console.log("category in Delete category module :", category);
  
  // const [category_name, setCategoryName] = useState(category?category.category_name : "")
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(token);
      const response = await axios.delete(
        `http://localhost:5000/category/deleteCategory/${category.category_id}`,
      
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


   
      alert(response.data.message)
      
      handleCategoryDelete();
    } catch (error) {
      console.log("Error in updating category :", error);
      // alert(error.message)
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        {category
          ? `Are you sure you want to delete the category "${category.category_name}"?`
          : "Category Not Found"}
      </Modal.Body>
      <Modal.Footer >
        <Button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="btn btn-danger" onClick={
          // () => 
          // handleCategoryDelete(category.category_id)
          handleDelete
          } disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryDeleteModule;
