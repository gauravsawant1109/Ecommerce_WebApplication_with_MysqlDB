import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/MoreDetails.css";
import AddToCartService from "../../Servises/AddToCartService";
import authService from "../../Servises/authService";
const MoreDetails = () => {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [id,setUserId]=useState()

    // getUserInfo for id
 async function getUserInfo(){
  const response = await authService.getUser()
  setUserId(response.id)
}
console.log("id",id);

const handleAddToCart = async (product) => {
      try {
          const response = await AddToCartService.addToCart(id, product.product_id )

          if (response.data.success) {
            alert(response.data.message)
              // fetchCartItems(); 
          } else {
              alert(response.data.message);
          }
      } catch (error) { 
          console.error("Error adding product to cart:", error);
      }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/getOneProduct/${product_id}`
        );
      
          setSelectedProduct(response.data.allProducts[0]); 
       
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    }
    fetchProduct();
    getUserInfo()
  }, [product_id]);

  useEffect(() => {
    if (selectedProduct) {
      async function fetchCategoryAndBrand() {
        try {
          const categoryResponse = await axios.get(
            `http://localhost:5000/category/getOneCategory/${selectedProduct.category_id}`
          );
          setCategory(categoryResponse.data.category);

          const brandResponse = await axios.get(
            `http://localhost:5000/brand/getOneBrand/${selectedProduct.brand_id}`
          );
          setBrand(brandResponse.data.brand);
        } catch (error) {
          console.error("Error fetching category or brand:", error);
        }
      }
      fetchCategoryAndBrand();
    }
  }, [selectedProduct]);

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <>
     
      {/* new code  */}
      <div className="product-detail-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={`http://localhost:5000/uploads/${selectedProduct.product_image}`}
          alt={selectedProduct.product_name}
        />
      </div>

      <div className="product-info">
        <h1 className="product-title">{selectedProduct.product_name}</h1>
        <p className="product-price">₹{selectedProduct.price}</p>
        <p className="brand-category">
          <strong>Brand:</strong> {brand ? brand.brand_name : "Loading..."}
        </p>
        <p className="brand-category">
          <strong>Category:</strong> {category ? category.category_name : "Loading..."}
        </p>
        <p className="product-description">{selectedProduct.discription}</p>
        <p className={`product-stock ${selectedProduct.stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : "Out of Stock"}
        </p>

        <div className="buy-buttons">
          {/* <button className="buy-now">Buy Now</button> */}
          <button className="buy-now" onClick={()=>handleAddToCart(selectedProduct)}>Add to Cart</button>
        </div>
      </div>
    </div>
  
    </>
  );
};

export default MoreDetails;

// previous code product shower code 
{/* <img
style={{ height: "500px" }}
src={`http://localhost:5000/uploads/${selectedProduct.product_image}`}
alt={selectedProduct.product_name}
/>
<h1>{selectedProduct.product_name}</h1>
<p>Price:{selectedProduct.price}</p>
<p>Brand : {brand ? brand.brand_name : "Loading brand..."}</p>
<p>Discription:{selectedProduct.discription}</p>
<p>Stock:{selectedProduct.stock}</p>
<p>Catgory : {category ? category.category_name : "Loading category..."}</p> */}
