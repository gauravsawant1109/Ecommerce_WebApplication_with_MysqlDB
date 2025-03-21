import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BrandEditModule = ({ Show, handleClose, brand, handleBrandUpdate }) => {
  console.log("Brand in edit module:", brand);

  const [brand_name, setBrandName] = useState("");
  const [brand_image, setBrandImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
  }

  useEffect(() => {
    if (brand) {
      setBrandName(brand.brand_name || "");
      setPreviewImage(brand.brand_image || ""); 
    }
  }, [brand]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandImage(file);
     setPreviewImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("brand_name", brand_name);
      if (brand_image) {
        formData.append("brand_image", brand_image);
      }

      const response = await axios.put(
        `http://localhost:5000/brand/updateBrand/${brand.brand_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Brand updated successfully!");
      handleBrandUpdate(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating brand:", error);
      alert("Failed to update brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="brandName" className="form-label">
              Brand Name
            </label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              value={brand_name}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brandImage" className="form-label">
              Brand Image
            </label>
            <input
              type="file"
              className="form-control"
              id="brandImage"
              onChange={handleImageChange} // Fixed issue here
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
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BrandEditModule;
