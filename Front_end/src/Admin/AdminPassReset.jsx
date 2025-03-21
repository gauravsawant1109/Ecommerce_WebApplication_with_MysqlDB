import React from 'react'
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link , useNavigate } from "react-router-dom";
import "../css/Login.css";
import YellowLayer from "../assets/YellowLayerImage.png";
import BoyDoingLogin from "../assets/BoyDoingLogin.png";
import Lamp from "../assets/Lamp.png";
import authService from "../Servises/authService";
import { UserContext } from "../UserContext/userContext";
const AdminPassReset = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    // const { setUser } = useContext(UserContext);
  
    const handleChange =(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
  
    const handleSubmit = async (e) => {
     e.preventDefault()
     console.log("Reset Password Form Data",formData);

     try{
     await authService.PassReset(formData.email,formData.password) 
      } catch (error) {
        console.log(error);
        alert("Password Reset Failed")
      }
    };
  return (
    <div className="d-md-flex backgroundColor vh-100">
    <div className="col-12 col-lg-6  h-100 d-flex justify-content-center align-items-center">
      <form className="form w-50 d-flex flex-column" onSubmit={handleSubmit}> 
        <h1 className="text-center">PASSWORD RESET</h1>
        <label className="">Email</label>
        <input type="email" className="input"   
        name="email"
        value={formData.email}
        onChange={handleChange}
        />
        <label>Password</label>
        <input type="Password" className=" input" required 
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* <Link to="/Registration" className="text-center text-white ">
          <p className="RegistrationLink">To Registration</p>
        </Link> */}
        {/* <Link to="/Home" className="m-auto"> */}
          <button
            type="submit"
            className="btn btn-warning text-white submitButton"
          >
            Reset 
          </button>
        {/* </Link> */}
      </form>
    </div>
    <div className="d-none d-lg-block w-50 position-relative">
      <img
        src={BoyDoingLogin}
        className="h-50  position-absolute start-50  z-1"
        style={{ top: "20%" }}
      />
      <img
        src={Lamp}
        className="h-25  position-absolute top-0 lampImage"
        style={{ left: "35%" }}
      />
      <img
        src={YellowLayer}
        className="h-100  position-absolute bottom-0 end-0"
      />
    </div>
  </div>
  )
}

export default AdminPassReset

