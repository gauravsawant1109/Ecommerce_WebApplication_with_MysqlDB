import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Component/Login";
import Registration from "./Component/Registration";
import Home from "./Admin/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import UserHome from "./User/UserHome";
import UserProvider from "./UserContext/userContext";
import AdminPassReset from "./Admin/AdminPassReset";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/LoginPage" />} />
            <Route path="/LoginPage" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/AdminPassReset" element={<AdminPassReset />} />
            <Route path="/Home/*" element={<Home />} />
            <Route path="/UserHome/*" element={<UserHome />} />
          </Routes>
          <Footer />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
