import React, { useEffect, useState } from "react";
import axios from "axios";
import AddToCartService from "../Servises/AddToCartService.jsx";
import authService from "../Servises/authService.jsx";

const CartComponent = () => {
  const [productATCid, setProductATCid] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [ATCproducts, setATCproducts] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const handleUserData = async () => {
      try {
        const response = await authService.getUser();
        setId(response.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    handleUserData();
  }, []);

  const fetchCartItems = async () => {
    if (!id) return;
    try {
      const response = await AddToCartService.getAddToCart(id);
      setProductATCid(response.map(String));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, [id]);

  async function handleDelete(product_id) {
    await AddToCartService.deleteAddToCart(id, product_id);
    fetchCartItems();
    fectATC();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/product/getAllProduct"
        );
        setAllProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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

  const totalPrice = ATCproducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="  d-flex align-items-center justify-content-center " style={{minHeight:"400px"}}>
     <div className="col-12 col-md-9">
     <h2 className="text-center mb-4">Shopping Cart</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ATCproducts.length > 0 ? (
            ATCproducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td className="text-center">Rs. {product.price}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                Product Not Found
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="table-secondary">
            <td colSpan={2} className="fw-bold">
              Total Price
            </td>
            <td className="text-center fw-bold">Rs. {totalPrice}</td>
          </tr>
        </tfoot>
      </table>
     </div>
    </div>
  );
};

export default CartComponent;
