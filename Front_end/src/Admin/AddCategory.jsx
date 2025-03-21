import React from "react";
import { useState } from "react";
import "../CSS/Product.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const AddCategory = () => {
  const token = localStorage.getItem("token");

  const [category_name, setName] = useState();
  const [category_image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Category Name:", category_name);
    console.log("Category Image:", category_image);

    if (!token) {
      alert("User is Not Authenticated");
      setError("User is Not Authenticated");
      return;
    }

    try {
      // required
      const formData = new FormData();
      formData.append("category_name", category_name);
      if (category_image) formData.append("category_image", category_image);


      await axios.post("http://localhost:5000/category/addCategory", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Category Added Successfully!");
      setError(null);
      setName("");
      setImage(null);
    } catch (error) {
      setError("Error in adding Category, Please try Again!");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // const handleShow = (e) => {
  //   e.preventDefault();
  //   setShow(true);
  // };

  function handleDismiss() {
    console.log("handle dissmiss function has been called");
    setError(null);
    setSuccess(null);
  }
  return (
    <>
      <div
        className="d-flex justify-content-center  align-items-center"
        style={{ width: "auto", height: "auto", minHeight: "500px" }}
      >
        <form
          className="row  border bg-secondary-subtle p-3 rounded border-3  m-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="">Add Category</h2>
          <div class="mb-2">
            <label for="CategoryName" class="form-label">
              Category Name
            </label>
            <input
              type="text"
              class="form-control"
              id="CategoryName"
              aria-describedby="emailHelp"
              value={category_name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div class="mb-2">
            <label for="CategoryName" class="form-label">
              Category Image
            </label>
            <input
              type="file"
              class="form-control"
              id="CategoryImage"
              aria-describedby="emailHelp"
              // value={category_image}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="close"
                onClick={handleDismiss}
                aria-label="Close"
                style={{ position: "absolute", right: "10px", top: "5px" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          {success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {success}
              <button
                type="button"
                className="close btn btn-success py-0 px-1"
                onClick={handleDismiss}
                aria-label="Close"
                style={{ position: "absolute", right: "10px", top: "5px" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <button
            type="submit"
            class="btn btn-primary m-auto"
            // onClick={handleShow}
            style={{ width: "auto" }}
          >
            {loading ? "Addding...." : "Add"}
          </button>
        </form>
      </div>
      {/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Category has been Added !!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};
export default AddCategory;
