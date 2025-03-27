import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProductEditModule = ({ Show, handleProductUpdate, handleCloseModal, SelectedProduct }) => {
  const [EditedProduct, setEditedProduct] = useState({});
  const [Categories, setCategories] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [product_image, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated !!");
      return;
    }

    if (SelectedProduct) {
      setEditedProduct(SelectedProduct);
      if (SelectedProduct.product_image) {
        setPreviewImage(`http://localhost:5000/uploads/${SelectedProduct.product_image}`);
      }
    }

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
  }, [SelectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("product_name", EditedProduct.product_name);
      formData.append("price", EditedProduct.price);
      formData.append("discription", EditedProduct.discription);
      formData.append("stock", EditedProduct.stock);
      formData.append("category_id", EditedProduct.category_id);
      formData.append("brand_id", EditedProduct.brand_id);
      if (product_image) {
        formData.append("product_image", product_image);
      }

      const response = await axios.put(
        `http://localhost:5000/product/updateProduct/${EditedProduct.product_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      handleProductUpdate(response.data.product);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="product_name"
              value={EditedProduct.product_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={EditedProduct.price || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="discription"
              value={EditedProduct.discription || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={EditedProduct.stock || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              name="category_id"
              value={EditedProduct.category_id || ""}
              onChange={handleChange}
            >
              <option value="">Choose a category</option>
              {Categories.map((category) => (
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
              name="brand_id"
              value={EditedProduct.brand_id || ""}
              onChange={handleChange}
            >
              <option value="">Choose a brand</option>
              {Brands.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="productImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Product Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductEditModule;
