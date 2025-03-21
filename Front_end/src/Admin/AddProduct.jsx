import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Product.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const [Categories, setCategories] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    price: null,
    discription: "",
    stock: null,
    category_id: null,
    brand_id: null,
    product_image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5000/category/getAllCategories"
        );
        setCategories(categoryResponse.data.categoriesResult);

        const brandResponse = await axios.get(
          "http://localhost:5000/brand/getAllBrand"
        );
        setBrands(brandResponse.data.brands);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!newProduct.product_name || !newProduct.price || !newProduct.category_id || !newProduct.brand_id ) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
  }
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post("http://localhost:5000/product/addProduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewProduct({
        product_name: "",
        price: null,
        discription: "",
        stock: null,
        category_id: null,
        brand_id: null,
        product_image: null,
      });
      setSuccess("Product added successfully!");
    } catch (error) {
      setError("Failed to add product. Please try again!");
    } finally {
      setLoading(false);
    }
  };
  console.log("newProduct", newProduct);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "500px" }}
    >
      <form
        className="row w-75 border bg-secondary-subtle p-3 rounded border-3 m-auto mt-4 mb-4"
        onSubmit={handleSubmit}
      >
        <h2>Add Product</h2>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="product_name"
            value={newProduct.product_name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="discription"
            value={newProduct.discription}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Category</label>
          <select
            name="category_id"
            className="form-control"
            value={newProduct.category_id}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            {Categories.map((category) => (
              <option
                type="number"
                key={category.category_id}
                value={parseInt(category.category_id)}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Brand</label>
          <select
            name="brand_id"
            className="form-control"
            value={parseInt(newProduct.brand_id)}
            onChange={handleChange}
          >
            <option value="">Choose a Brand</option>
            {Brands.map((brand) => (
              <option type="number" key={brand.brand_id} value={brand.brand_id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 text-center mb-3">
          <label>Product Image</label>
          <input
            type="file"
            name="product_image"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button
          type="submit"
          className="btn btn-primary m-auto"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
