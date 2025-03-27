import axios from "axios";

const AddToCartService = {
  addToCart: async (id, product_id) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.post(
        "http://localhost:5000/AddToCart/add",
        { id, product_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(" addToCart from AddToCartService", response.data.message);
      return response;
    } catch (error) {
      console.log("AddToCart  Failed ", error);
      throw error;
    }
  },

  getAddToCart: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        `http://localhost:5000/AddToCart/getAddToCart/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(" addToCart from AddToCartService", response.data.addToCart);
      return response.data.addToCart;
    } catch (error) {
      console.log("AddToCart  Failed ", error);
      throw error;
    }
  },

  deleteAddToCart: async (id, product_id) => {
    const token = localStorage.getItem("token");

    if (!token) return null;
    try {
      const response = await axios.delete(
        `http://localhost:5000/AddToCart/deleteAddToCart`,
        {
          data: { id, product_id }, // Move data inside the `data` property
        }
      );
      console.log(" addToCart from AddToCartService", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("AddToCart  Failed ", error);
      throw error;
    }
  },
};

export default AddToCartService;
