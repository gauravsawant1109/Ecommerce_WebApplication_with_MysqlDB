import axios from "axios";
import { useNavigate } from "react-router-dom";
// service module
// const navigate = useNavigate()
const authService = {
  // login service
  login: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      console.log('response.data',response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("logined token is set by authService",token);
      return token; 
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:5000/user/getUserInfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
console.log("getUser info as 'response.data.user' from authService",response.data.user);
      return response.data.user;

    } catch (error) {
      console.log("failed to get User ", error);
      throw null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    alert("Sucessfully LogOut !!")
    console.log("Token is Remove from localStorage by authservices");
    
  },

  PassReset: async(email,password)=>{
    try {
      const response = await axios.post('http://localhost:5000/user/AdminPassReset',{email,password})
    if(response.data.success){
    
      alert(response.data.message)
   
    }else{
      alert(response.data.message)
    }
      
    } catch (error) {
      console.log('fail to rest Password :',error);
      
    
    }
  }
};
export default authService;
