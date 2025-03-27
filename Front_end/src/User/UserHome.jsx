import React from "react";
import UserNavigationBar from "./UserNavigationBar";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultHome from "./DefaultHome";
import AddToCart from "./CartComponent";
import WishList from "./WishList";
import { BrowserRouter } from "react-router-dom";
import SelectedCategory from "./userCategory/SelectedCategory";
import MoreDetails from "./userProduct/MoreDetails";
import SelectedBrand from "./userBrand/SelectedBrand";

const UserHome = () => {
  return (
    <div>
      <UserNavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="HomePage" />} />
          <Route path="HomePage" element={<DefaultHome />} />
          <Route path="AddToCartPage" element={<AddToCart />} />
          <Route path="WishListPage" element={<WishList />} />
          <Route path="AddToCart/:product_id" element={<AddToCart/>}/>
          <Route path="MoreDetails/:product_id" element={<MoreDetails/>} />
          <Route path="SelectedCategory/:category_id" element={<SelectedCategory/>} />
          <Route path="SelectedBrand/:brand_id" element={<SelectedBrand/>} />
        </Routes>
      </div>
    </div>
  );
};

export default UserHome;
