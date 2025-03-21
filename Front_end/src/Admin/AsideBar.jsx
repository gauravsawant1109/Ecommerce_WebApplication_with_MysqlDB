import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Links } from "react-router-dom";
import "../CSS/AsideBar.css"
const AsideBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg  bg-white  p-0" style={{width:'',maxHeight:"540px" }}>
        <div class="container-fluid p-0">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse  " id="navbarSupportedContent">
            <ul   class="navbar-nav m-0 p-0 fs-5 d-flex flex-column align-items-center  w-100 ">
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none "   to="/Home/Products">
                  <a class="nav-link active"  aria-current="page" href="">
                    Products
                  </a>
                </Link>
              </li>
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none"   to="/Home/AddProduct">
                  <a class="nav-link active" aria-current="page" href="#">
                    Add Products
                  </a>
                </Link>
              </li>
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none"  to="/Home/Category">
                  <a class="nav-link active" aria-current="page" href="#">
                    Category
                  </a>
                </Link>
              </li>
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none"  to="/Home/AddCategory">
                  <a class="nav-link active" aria-current="page" href="#">
                    Add Category
                  </a>
                </Link>
              </li>
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none"  to="/Home/Brand">
                  <a class="nav-link active" aria-current="page" href="#">
                    Brand
                  </a>
                </Link>
              </li>
              <li class="nav-item cu-AsideBarli">
                <Link className="text-decoration-none"  to="/Home/AddBrand">
                  <a class="nav-link active" aria-current="page" href="#">
                  AddBrand
                  </a>
                </Link>
              </li>
            </ul>
            {/* <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AsideBar;
