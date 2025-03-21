import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Product.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryEditMdodule from "../Module/CategoryModule/CategoryeditMdule";
import CategoryDeleteModule from "../Module/CategoryModule/CategoryDeleteModule";

const Category = () => {
  const token = localStorage.getItem("token"); //---token

  const [ShowEditModal, setShowEditModal] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

  const [Categories, setCategories] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  // const [SelectedCategoryDelete, setSelectedCategoryDelete] = useState();
  async function fetchCategories() {
    try {
      const ApiResponse = await axios.get(
        "http://localhost:5000/category/getAllCategories"
      );
      setCategories(ApiResponse.data.categoriesResult);
    } catch (error) {
      console.error("Error in fetching categories :", error);
    }
  }

  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated ");
    }

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    console.log("EditModel Passed category", category);
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handleCategoryUpdate = (updateCategory) => {
    setCategories(
      Categories.map((cat) =>
        cat.category_id === updateCategory.category_id ? updateCategory : cat
      ) 
    );
    handleCloseModal();
    fetchCategories();

  };

  const handleCategoryDelete = (deletedCategoryId) => {
    setCategories(Categories.filter((cat) => cat.category_id != deletedCategoryId));
    handleCloseModal();
    fetchCategories();

  };

  // const handleCloseDelete = () => setShowDelete(false);
  // const handleShowDelete = (category) => {
  //   console.log("DeleteModel Passed category", category);
  //   setSelectedCategoryDelete(category);
  //   setShowDelete(true);
  // };

  console.log("all categories in category", Categories);
  console.log("selected category in category list :", SelectedCategory);

  return (
    <>
      <div
        className="d-flex  justify-content-center flex-column align-items-center h-100 p-4"
        style={{ width: "auto" }}
      >
        <h1> ALL CATEGORIES</h1>
        {/* <ul type='1' className='w-50 fs-4 m-5'> */}

        {/* {Categories.map((Category,Index)=>(
          <li className='mb-2 'key={Index} >
          <div className='d-flex justify-content-between'  ><p > id:{Category.category_id} {Category.category_name}</p>   
          <p></p> 
        <div className='d-flex'><button className='btn btn-primary pt-0 pb-0 ms-2 me-2'>Edit</button><button className='btn btn-danger pt-0 pb-0'>Delete</button></div>
        </div>
        </li> 
        ))} */}

        {Categories.length != 0 ? (
          <table className="w-100 fs-4 m-5 text-center table  table-hover table-striped rounded">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((Category, Index) => (
                <tr className="" style={{height:"80px"}} key={Index}>
                  <td>{Category.category_id}</td>
                  <td>{Category.category_name}</td>
                  <td className="fs-6"><img src={`http://localhost:5000/uploads/${Category.category_image}`} alt="Image" style={{height:"80px"}}/></td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary pt-0 pb-0 ms-2 me-2"
                        onClick={() => handleEditClick(Category)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger pt-0 pb-0"
                        onClick={() => handleDeleteClick(Category)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="m-5 ">Categories Not Found</h4>
        )}

        {/* </ul> */}
      </div>
      {SelectedCategory && (
        <>
          <CategoryEditMdodule
            Show={ShowEditModal}
            handleClose={handleCloseModal}
            category={SelectedCategory}
            handleCategoryUpdate={handleCategoryUpdate}
          />
          <CategoryDeleteModule
            Show={ShowDeleteModal}
            handleClose={handleCloseModal}
            category={SelectedCategory}
            handleCategoryDelete={handleCategoryDelete}
          />
        </>
      )}
    </>
  );
};

export default Category;
