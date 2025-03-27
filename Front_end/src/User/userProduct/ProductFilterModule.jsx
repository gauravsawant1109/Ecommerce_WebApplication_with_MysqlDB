import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProductFilterModule = ({ Show, handleClose, setFilteredData }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    const filters = {
      selectedCategory,
      selectedBrand,
    };
    setFilteredData(filters); 
    handleClose(); 
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get("http://localhost:5000/category/getAllCategories"),
          axios.get("http://localhost:5000/brand/getAllBrand"),
        ]);

        setCategories(categoriesRes.data.categoriesResult);
        setBrands(brandsRes.data.brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Modal show={Show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <select
              className="form-control"
              value={selectedBrand || ""}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Choose a brand</option>
              {brands.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFilterModule;
