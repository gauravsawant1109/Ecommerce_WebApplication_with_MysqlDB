import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../css/Login.css";
import YellowLayer from "../assets/YellowLayerImage.png";
import RegistredBoy from "../assets/RegistredBoy.png";
import Lamp from "../assets/Lamp.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    console.log("role from Registration form",role);
    
    try {
      const responese = await axios.post('http://localhost:5000/user/registration',{role,name,email,password})
      if(responese.data.success){
        setSuccessMessage("Registration Sucessfully ! you can login ")
        alert(responese.data.message)
        navigate('/LoginPage')
      }else{
        alert("Registration fail")
      }
    } catch (error) {
      if (error.responese && error.responese.data && error.responese.message) {
        setErrorMessage(error.reponse.message)
        alert("Registration failed")
      } else {
        setErrorMessage("An Error Occurred. please try again !")
      
      }
    }


  };
  return (
    <div className="d-flex backgroundColor vh-100">
      <div className="col-12 col-lg-6  h-100 d-flex justify-content-center align-items-center">
        <form className="form w-50 d-flex flex-column" onSubmit={onSubmit}>
          {errorMessage && <div>{errorMessage}</div>  }
          {successMessage && <div>{successMessage}</div> }
          <h1 className="text-center">REGISTRATION PAGE</h1>
          <label className="">Name</label>
          <input type="text" className=" input" required autoFocus 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <label className="">Email</label>
          <input type="email" className=" input" required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="Password" className=" input" required 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
          />
          <p>Role</p>
<div className="d-flex mb-3">
  <div>
    <input
      type="radio"
      value="admin"
      name="Role"
      checked={role === "admin"}
      onChange={(e) => setRole(e.target.value)}
    />
    <label>Admin</label>
  </div>
  <div className="ms-3">
    <input
      type="radio"
      value="common user"
      name="Role"
      checked={role === "common user"}
      onChange={(e) => setRole(e.target.value)}
    />
    <label>User</label>
  </div>
</div>
          {/* <Link to="/LoginPage" className="m-auto"> */}
            <button
              type="submit"
              className="btn btn-warning text-white submitButton"
            >
              Submit
            </button>
          {/* </Link> */}
        </form>
      </div>
      <div className="d-none d-lg-block w-50 position-relative">
        <img
          src={RegistredBoy}
          className="h-50  position-absolute  z-1"
          style={{ top: "20%", left: "46%" }}
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
  );
};

export default Registration;
