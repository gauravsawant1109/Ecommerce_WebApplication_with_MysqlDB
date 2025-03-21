import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddBrand() {
  const token = localStorage.getItem("token");

  const [brand_name, setName] = useState("");
  const [brand_image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    if (brand_image) formData.append("brand_image", brand_image);

    try {
      await axios.post("http://localhost:5000/brand/addBrand", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Brand added successfully!");
      setError(null);
      setName(""); // Clear input
      setImage(null);
    } catch (error) {
      setError( "Error adding brand!");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
      <form className="row border bg-secondary-subtle p-3 rounded border-3 m-auto" onSubmit={handleSubmit}>
        <h2>Add Brand</h2>

        <div className="mb-2">
          <label htmlFor="brandName" className="form-label">Brand Name</label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            value={brand_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="BrandImage" className="form-label">Brand Image</label>
          <input
            type="file"
            className="form-control"
            id="BrandImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="close" onClick={handleDismiss} aria-label="Close" style={{ position: "absolute", right: "10px", top: "5px" }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button type="button" className="close btn btn-success py-0 px-1" onClick={handleDismiss} aria-label="Close" style={{ position: "absolute", right: "10px", top: "5px" }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary m-auto" style={{ width: "auto" }} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddBrand;
