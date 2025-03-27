import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Product.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDeleteModule from "../Module/ProductModule/ProductDeleteModule";
import ProductEditModule from "../Module/ProductModule/ProductEditModule";
const Products = () => {
  const [Products, setProducts] = useState([]);
  const [ProductCount, setProductCount] = useState([]);
  const [FilterProduct, setFilterProduct] = useState("");
  const [Categories, setCategories] = useState([]);
  const [Brands, setBrands] = useState([]);

  const token = localStorage.getItem("token"); //---token

  const [ShowEditModal, setShowEditModal] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

  const [SelectedProduct, setSelectedProduct] = useState([]);

  async function filterProduct(e) {
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
  async function fetchProduct() {
    const ApiResponse1 = await axios.get(
      "http://localhost:5000/product/getAllProduct"
    );
    setProducts(ApiResponse1.data.allProducts);

    const ApiResponse2 = await axios.get(
      "http://localhost:5000/product/CountOfProduct"
    );
    setProductCount(ApiResponse2.data.ProductCount.TotalProduct);

    const ApiResponse3 = await axios.get(
      "http://localhost:5000/category/getAllCategories"
    );
    setCategories(ApiResponse3.data.categoriesResult);

    const ApiResponse4 = await axios.get(
      "http://localhost:5000/brand/getAllBrand"
    );
    setBrands(ApiResponse4.data.result);
  }
  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated ");
    }

    fetchProduct();
  }, []);

  const handleEditClick = (product) => {
    console.log("EditModel Passed Product", product);
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updateProduct) => {
    // setCategories(
    //   Categories.map((Product) =>
    //     Products.product_id === updateProduct.product_id_id
    //       ? updateProduct
    //       : Product
    //   )
    // );
    handleCloseModal();
    fetchProduct();
  };

  const handleProductDelete = (deletedProductId) => {
    // setCategories(
    //   Products.filter((prod) => prod.product_id != deletedProductId)
    // );
    handleCloseModal();
    fetchProduct();
  };

  console.log("product List: ", Products);
  console.log("Product Count : ", ProductCount);
console.log("SelectedProduct",SelectedProduct)
 
  return (
    <>
      <p className="text-end fw-bold my-2 pe-2 w-100">
        Total Products : {ProductCount}{" "}
      </p>

      {/* search Bar  */}

      <div className="text-center">
        <form onSubmit={filterProduct}>
          <input
            type="text"
            value={FilterProduct}
            // value={FilterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          />
          <button className="btn btn-primary ms-1" type="submit">
            Filter
          </button>
        </form>
      </div>

      <h1 className="text-center m-3 ">All Products</h1>
      {Products.length != 0 ? (
        <div
          className="d-flex flex-wrap justify-content-center align-items-center pb-4 "
          style={{ width: "auto" }}
        >
          {Products.map((product, index) => (
            <div
              key={index}
              class="card cu-card m-2 border border-0 "
              style={{ width: "250px", height: "395px" }}
            >
              <img
                style={{ height: "300px" }}
                src={
                  product.product_image
                    ? `http://localhost:5000/uploads/${product.product_image}`
                    : "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/p/v/l-os-100-vdorgnl-nvy-veirdo-original-imah256cvtzjwn5r.jpeg?q=70"
                }
                class="card-img-top"
                alt="Product Image"
              />
              <div class="card-body p-0 ps-3 pt-2">
                <p class="card-title m-0 fw-bold"> {product.product_name} </p>
                <p class="card-text m-0">Rs. {product.price}</p>

                {/* <a href="#" class="btn btn-primary p-0 ps-1 pe-1">Go </a> */}
                <div className="d-flex justify-content-around px-2">
                  <button
                    className="btn btn-primary py-0"
                    // variant="primary"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger py-0"
                    // variant="primary"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center m-0 ">Products Not Found</h4>
      )}

      {SelectedProduct && (
        <>
          <ProductEditModule 
          Show={ShowEditModal}
          handleProductUpdate={handleProductUpdate}
          handleCloseModal={handleCloseModal}
          SelectedProduct={SelectedProduct} 
          />
          <ProductDeleteModule
          Show ={ShowDeleteModal}
          SelectedProduct={SelectedProduct}
          handleProductDelete={handleProductDelete}
          handleCloseModal={handleCloseModal}
          />
        </>
      )}
    </>
  );
};

export default Products;
