import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CategoryEditMdodule = ({ Show, handleClose, category, handleCategoryUpdate }) => {
  console.log("category in edit category module :", category);
  
  const [category_name, setCategoryName] = useState(category?category.category_name : "")
  const [category_image,setCategoryImage]=useState(null)
  const [previewImage, setPreviewImage] = useState(""); 

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  

  if (!token) {
    alert("User is not Authenticated !!");
  }

// useEffect(()=>{
//   if (brand) {
//     setBrandName(brand.brand_name || "");
//     setPreviewImage(brand.brand_image || ""); 
//   }
// },[])
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setCategoryImage(file);
   setPreviewImage(URL.createObjectURL(file)); 
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(category_name, token);
      const formData = new FormData();
      formData.append("category_name", category_name);
      if (category_image) {
        formData.append("category_image", category_image);
      }

      const response = await axios.put(
        `http://localhost:5000/category/updateCategory/${category.category_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCategoryUpdate(response.data);
    } catch (error) {
      console.log("Error in updating category :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        <form className="row" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ProductName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ProductName"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brandImage" className="form-label">
              Brand Image
            </label>
            <input
              type="file"
              className="form-control"
              id="categoryImage"
              onChange={handleImageChange} 
              accept="image/*"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Brand Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditMdodule;
