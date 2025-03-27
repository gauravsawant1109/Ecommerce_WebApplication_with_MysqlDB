import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/AddToCart.css";
import AddToCartService from "../Servises/AddToCartService.jsx";
import authService from "../Servises/authService.jsx";

const CartComponent = () => {
  const [productATCid, setProductATCid] = useState([]); // Product IDs in AddToCart (as strings)
  const [allProducts, setAllProducts] = useState([]); // All products
  const [ATCproducts, setATCproducts] = useState([]); // Rendered products in cart
  const [id, setId] = useState(null); // User ID

  // get user Info
  useEffect(() => {
    const handleUserData = async () => {
      try {
        const response = await authService.getUser();
        console.log("handleUserData response:", response);
        setId(response.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    handleUserData();
  }, []);

  // fetching addtocart Items
  const fetchCartItems = async () => {
    if (!id) return;
    try {
      const response = await AddToCartService.getAddToCart(id);
      console.log("fetchCartItems response:", response);

      // Convert all IDs to strings for accurate comparison
      setProductATCid(response.map(String));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, [id]);

  // delete product from AddToCat
  async function handleDelete(product_id) {
    const response = await AddToCartService.deleteAddToCart(id, product_id);
    alert(response);
    fectATC();
    fetchCartItems();
  }

  // fetching all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/product/getAllProduct"
        );
        console.log("fetchProducts response:", response.data.allProducts);
        setAllProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

    // render ATC

  function fectATC() {
    if (productATCid.length && allProducts.length) {
      setATCproducts(
        allProducts.filter((p) => productATCid.includes(String(p.product_id)))
      );
    }
  }
  useEffect(() => {
  
    fectATC();
  }, [productATCid, allProducts]);

  console.log("Product IDs in Cart:", productATCid);
  console.log("All products:", allProducts);
  console.log("Filtered Cart Products:", ATCproducts);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
        {ATCproducts.length > 0 ? (
          ATCproducts.map((product) => (
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
                <p className="card-title m-0 fw-bold">{product.product_name}</p>
                <p className="card-text m-0">Rs. {product.price}</p>
                <div className="d-flex justify-content-around p-0 m-0">
                  <button
                    className="btn btn-danger p-1"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Product Not Found</p>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
