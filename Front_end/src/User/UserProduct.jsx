import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Product.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import ProductFilterModule from "./userProduct/ProductFilterModule";
import "./CSS/UserProducts.css";
import AddToCartService from "../Servises/AddToCartService";
import authService from "../Servises/authService";
const UserProducts = () => {
  const [Products, setProducts] = useState([]);
  const [ProductCount, setProductCount] = useState([]);
  const [FilterProduct, setFilterProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [ShowFilterModal, setShowFilterModal] = useState(false);
  const [id, setUserId] = useState(null);
  const [filteredData, setFilteredData] = useState({
    selectedCategory: null,
    selectedBrand: null,
  });

  const navigate = useNavigate();
  async function filterProductBar(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/product/filteredProduct/${FilterProduct}`
      );
      setProducts(response.data.filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  }
  const handleMoreDetail = (product_id) => {
    navigate(`/UserHome/MoreDetails/${product_id}`);
  };
  const handleSelectedCategory = async (categoryId) => {
    navigate(`/UserHome/SelectedCategory/${categoryId}`);
  };

  function handleSelectedBrand(brandID) {
    navigate(`/UserHome/SelectedBrand/${brandID}`);
  }

  async function filterProduct(e) {
    e.preventDefault();
    try {
      const { selectedCategory, selectedBrand } = filteredData;
      const queryParams = new URLSearchParams();
      if (selectedCategory) queryParams.append("category_id", selectedCategory);
      if (selectedBrand) queryParams.append("brand_id", selectedBrand);

      const response = await axios.get(
        `http://localhost:5000/product/getfilteredProductByModal?${queryParams}`
      );
      if (response.data.success == "false") {
        alert(response.data.message);
      } else {
        setProducts(response.data.filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  }

  // getUserInfo for id
  async function getUserInfo() {
    const response = await authService.getUser();
    setUserId(response.id);
  }

  const handleAddToCart = async (product) => {
    try {
      const response = await AddToCartService.addToCart(id, product.product_id);

      if (response.data.success) {
        alert(response.data.message);
        // fetchCartItems();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  async function fetchData() {
    // all Product
    const ApiResponse1 = await axios.get(
      "http://localhost:5000/product/getAllProduct"
    );
    setProducts(ApiResponse1.data.allProducts);
    // All Categories
    const categoryResponse = await axios.get(
      "http://localhost:5000/category/getAllCategories"
    );
    setCategories(categoryResponse.data.categoriesResult);
    // AllBrand
    const brandResponse = await axios.get(
      "http://localhost:5000/brand/getAllBrand"
    );
    setBrands(brandResponse.data.brands);

    // Count Of Product
    const ApiResponse2 = await axios.get(
      "http://localhost:5000/product/CountOfProduct"
    );
    setProductCount(ApiResponse2.data.ProductCount.TotalProduct);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredData.selectedCategory || filteredData.selectedBrand) {
      filterProduct();
    }
    getUserInfo();
  }, [filteredData]);

  console.log("product List: ", Products);
  console.log("Product Count : ", ProductCount);
  console.log("FilterProduct : ", FilterProduct);
  console.log("category list :", categories);
  console.log("brand List :", brands);

  return (
    <>
      {/* categories  */}

      <div className="container my-4">
        <h2>Select By Categories</h2>
        <div className="overflow-x-scroll">
          <div className="d-flex justify-content-center  ">
            {categories.map((c, index) => (
              <Card
                key={index}
                className="m-2"
                style={{ width: "15rem" }}
                onClick={() => handleSelectedCategory(c.category_id)}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${c.category_image}`}
                  style={{ height: "12rem" }}
                  alt="Category image"
                />
                <Card.Body className="p-0 text-center">
                  <Card.Title>{c.category_name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Brands  */}
      <div className="container my-4">
        <h2>Select By Brands</h2>
        <div className="overflow-x-scroll">
          <div className="d-flex justify-content-center  ">
            {brands.map((b, index) => (
              <Card
                key={index}
                className="m-2"
                style={{ width: "15rem" }}
                onClick={() => handleSelectedBrand(b.brand_id)}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${b.brand_image}`}
                  style={{ height: "12rem" }}
                  alt="Category image"
                />
                <Card.Body className="p-0 text-center">
                  <Card.Title>{b.brand_name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* count shower  */}
      <div className="d-flex text-end fs-5">
        <p className="fw-bold m-2 pe-2 w-100">Total Products: {ProductCount}</p>
        <div
          className="m-1 text-primary"
          onClick={() => setShowFilterModal(true)}
        >
          <FaFilter />
        </div>
      </div>

      {/* search Bar  */}

      <div className="text-center">
        <form onSubmit={filterProductBar}>
          <input
            type="text"
            value={FilterProduct}
            // value={FilterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          />
          <button className="btn btn-primary ms-1 me-1" type="submit">
            Filter
          </button>
        </form>
      </div>

      {/* render Product  */}
      <h1 className="text-center m-3 ">All Products</h1>
      <div
        className="d-flex flex-wrap justify-content-center align-items-center pb-4 "
        style={{ width: "auto" }}
      >
        {Products ? (
          <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
            {Products.map((product) => (
              <div
                key={product.product_id}
                className="card cu-card m-2 border border-1"
                style={{ width: "250px", height: "395px" }}
              >
                <img
                  src={`http://localhost:5000/uploads/${product.product_image}`}
                  className="card-img-top"
                  alt="Product Image"
                  style={{ height: "300px" }}
                />
                <div className="card-body p-2">
                  <p className="card-title m-0 fw-bold">
                    {product.product_name}
                  </p>
                  <p className="card-text m-0">Rs. {product.price}</p>
                  <div className="d-flex justify-content-around p-0 m-0">
                    <button
                      href="#"
                      class="btn btn-primary p-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      AddToCart
                    </button>

                    <button
                      href="#"
                      class="btn btn-success p-1 "
                      onClick={() => handleMoreDetail(product.product_id)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center">Product Not Found</h1>
        )}
      </div>
      {ShowFilterModal && (
        <ProductFilterModule
          Show={ShowFilterModal}
          handleClose={() => setShowFilterModal(false)}
          setFilteredData={setFilteredData}
        />
      )}
    </>
  );
};

export default UserProducts;
