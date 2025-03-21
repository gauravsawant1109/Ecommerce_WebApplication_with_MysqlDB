import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Product.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandEditModule from "../Module/BrandModule/BrandEditModule";
import BrandDeleteModule from "../Module/BrandModule/BrandDeleteModule";

const Brand = () => {
  const token = localStorage.getItem("token"); //---token

  const [ShowEditModal, setShowEditModal] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [SelectedBrand, setSelectedBrand] = useState(null);
  const [Brands, setBrands] = useState([]);

  async function fetchBrands() {
    try {
      const response = await axios.get("http://localhost:5000/brand/getAllBrand");
      if (response.data.brands.length > 0) {
        setBrands(response.data.brands);
        // setSelectedBrand(response.data.result[0]); // Select the first brand by default
        setShowEditModal(true); // Open Edit modal on page load
        setShowDeleteModal(true); // Open Delete modal on page load
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated");
      return;
    }
    fetchBrands();
  }, [token]);

  console.log("Brands List:", Brands);
  console.log("SelectedBrand:", SelectedBrand);

  const handleEditClick = (brand) => {
    console.log("EditModel Passed Brand:", brand);
    console.log("handleEditClick function called");

    setSelectedBrand(brand);
    setShowEditModal(true);
  };

  const handleDeleteClick = (brand) => {
    console.log("handleDeleteClick function called");
    
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedBrand(null);
  };

  const handleBrandUpdate = () => {
    handleCloseModal();
    fetchBrands();
  };

  const handleBrandDelete = () => {
    handleCloseModal();
    fetchBrands();
  };
console.log("brand List ",Brands);

  return (
    <>
      <div className="d-flex  px-md-5 justify-content-center flex-column align-items-center h-100" style={{ width: "auto" }}>
        <h1>ALL BRANDS</h1>

        {Brands.length !== 0 ? (
          <table className="w-100  m-5 fs-4 text-center table table-hover table-striped rounded">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Brands.map((brand, index) => (
                <tr key={index}>
                  <td>{brand.brand_id}</td>
                  <td>{brand.brand_name}</td>
                  <td className="fs-6"><img src={`http://localhost:5000/uploads/${brand.brand_image}`} alt="Image" style={{height:"80px"}}/></td>

                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary pt-0 pb-0 ms-2 me-2" onClick={() => handleEditClick(brand)}>
                        Edit
                      </button>
                      <button className="btn btn-danger pt-0 pb-0" onClick={() => handleDeleteClick(brand)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="m-5">Brands Not Found</h4>
        )}
      </div>

      {SelectedBrand && (
        <>
          <BrandEditModule 
            Show={ShowEditModal}
            handleClose={handleCloseModal}
            brand={SelectedBrand}
            handleBrandUpdate={handleBrandUpdate}
          />
          <BrandDeleteModule 
            Show={ShowDeleteModal}
            handleClose={handleCloseModal}
            brand={SelectedBrand}
            handleBrandDelete={handleBrandDelete}
          />
        </>
      )}
    </>
  );
};

export default Brand;
