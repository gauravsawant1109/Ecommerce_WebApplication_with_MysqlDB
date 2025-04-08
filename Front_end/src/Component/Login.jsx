import React, { useContext } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link , useNavigate } from "react-router-dom";
import "../css/Login.css";
import YellowLayer from "../assets/YellowLayerImage.png";
import AdminPassResetBoy from "../assets/AdminPassResetBoy.png";
import Lamp from "../assets/Lamp.png";
import authService from "../Servises/authService";
import { UserContext } from "../UserContext/userContext";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData.email,formData.password);
      const userInfo = await authService.getUser();
        setUser(userInfo);
        alert("User Info Received, Login Successfully !");
        if(userInfo.role=="admin"){
        navigate('/Home/Products')
        }else if(userInfo.role=="common user"){
        navigate('/UserHome/HomePage')
        }else{
          alert("User NOt Found, Login Failed")
        }
    } catch (error) {
      console.log(error);
      
      alert(" Login Failed")

    }
  };
  return (
    <>
      <div className="d-md-flex backgroundColor vh-100">
        <div className="col-12 col-lg-6  h-100 d-flex justify-content-center align-items-center">
          <form className="form w-50 d-flex flex-column" onSubmit={handleSubmit}> 
            <h1 className="text-center">LOGIN</h1>
            <label className="">Email</label>
            <input type="email" className="input" required autoFocus 
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
           <div className="d-flex justify-content-around" >
           <Link to="/Registration" className="text-center text-white ">
              <p className="RegistrationLink">To Registration</p>
            </Link>

           {/* <Link to="/AdminPassReset" className="text-center text-white ">
              <p className="RegistrationLink">Reset Password</p>
            </Link>*/}
           </div>
            {/* <Link to="/Home" className="m-auto"> */}
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
            src={AdminPassResetBoy}
            className="h-50  position-absolute   z-1"
            // style={{ top: "20%" }}
            style={{ top: "25%",right:"8%" }}
          />
          <img
            src={Lamp}
            className="h-25  position-absolute top-0 lampImage"
            style={{ left: "30%" }}
          />
          <img
            src={YellowLayer}
            className="h-100  position-absolute bottom-0 end-0"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
