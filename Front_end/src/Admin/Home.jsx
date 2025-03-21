import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AsideBar from './AsideBar';
import Products from './Products';
import AddCategory from './AddCategory';
import Category from './Category';
import Brand from './Brand';
import AddBrand from './AddBrand';
import AddProduct from './AddProduct';
import NavigationBar from './NavigationBar';
import "../CSS/Home.css"
const Home = () => {
  return (
    <div className='HomePage'>
      <NavigationBar/>
    <div className='d-lg-flex'>
      <AsideBar className=""  /> 
      <div className='w-100' > 
        <Routes>
          <Route path="/" element={<Navigate to="Products" />} />
          <Route path="Products" element={<Products />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path='Category' element={<Category />} />
          <Route path='AddCategory' element={<AddCategory />} />
          <Route path='Brand' element={<Brand />} />
          <Route path='AddBrand' element={<AddBrand />} />
        </Routes>
      </div>
      
    </div>
    </div>
  );
};

export default Home;
