import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SelectedBrand = () => {
    const navigate = useNavigate();

  const { brand_id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const handleMoreDetail = (product_id) => {
    navigate(`/UserHome/MoreDetails/${product_id}`);
  };

  const handleAddToCart = () => {};
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/getProductByBrand/${brand_id}`
        );
        setSelectedProducts(response.data.allProducts);
        setSelectedBrand(response.data.brand.brand_name);
        // console.log("Selected Products:", response.data.allProducts,"selected category",response.data.category.category_name);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (brand_id) {
      fetchProducts();
    } else {
      alert("cannot Get brand_id");
    }
  }, [brand_id]);
  console.log(
    "Selected Products:",
    selectedProducts,
    "selected category",
    selectedBrand
  );
  console.log("selectedProducts length",selectedProducts.length);
  
  return (
    <div
      className="d-flex justify-content-center align-items-center my-4"
      style={{ minHeight: "300px" }}
    >
      <div>
        <h2 className="text-center mb-4 ">Brand : {selectedBrand} </h2>
        {selectedProducts.length ? (  
          <>
            <div
              className="d-flex flex-wrap justify-content-center align-items-center pb-4 "
              style={{ width: "auto" }}
            >
              {selectedProducts.map((product, index) => (
                <div
                  key={index}
                  class="card cu-card m-2 border border-1"
                  style={{ width: "250px", height: "395px" }}
                >
                  <img
                    style={{ height: "300px" }}
                    src={`http://localhost:5000/uploads/${product.product_image}`}
                    class="card-img-top"
                    alt="Product Image"
                  />
                  <div class="card-body p-2 ">
                    <p class="card-title m-0 fw-bold">
                      {" "}
                      {product.product_name}{" "}
                    </p>
                    <p class="card-text m-0">Rs. {product.price}</p>

                    <div className="d-flex justify-content-around p-0 m-0">
                      <button
                        href="#"
                        class="btn btn-primary p-1"
                        onClick={handleAddToCart}
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
          </>
        ) : (
          <h4 className="text-center"> Product Not Found </h4>
        )}
      </div>
    </div>
  )
}

export default SelectedBrand