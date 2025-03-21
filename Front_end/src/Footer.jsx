import React from "react";
import "./CSS/Footer.css"
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5 px-4">
    <div className="">
      <div className=" text-center d-flex flex-wrap justify-content-evenly">
        <div className="  mb-4">
          <h5 className="fw-bold">PRODUCTS</h5>
          <ul className="list-unstyled">
            <li>Footwear</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Outlet-Sale</li>
            <li>New Arrivals</li>
            <li>Flat 50% Off!</li>
          </ul>
        </div>
        <div className="  mb-4">
          <h5 className="fw-bold">SPORTS</h5>
          <ul className="list-unstyled">
            <li>Cricket</li>
            <li>Running</li>
            <li>Football</li>
            <li>Gym/Training</li>
            <li>Tennis</li>
            <li>Outdoor</li>
            <li>Basketball</li>
            <li>Swimming</li>
            <li>Skateboarding</li>
            <li>Motorsport</li>
          </ul>
        </div>
        <div className="  mb-4">
          <h5 className="fw-bold">COLLECTIONS</h5>
          <ul className="list-unstyled">
            <li>Ultraboost</li>
            <li>Superstar</li>
            <li>NMD</li>
            <li>Stan Smith</li>
            <li>Sustainability</li>
            <li>Predator</li>
            <li>Parley</li>
            <li>Adicolor</li>
          </ul>
        </div>
        <div className="  mb-4">
          <h5 className="fw-bold">SUPPORT</h5>
          <ul className="list-unstyled">
            <li>Help</li>
            <li>Customer Services</li>
            <li>Returns & Exchanges</li>
            <li>Shipping</li>
            <li>Order Tracker</li>
            <li>Store Finder</li>
            <li>adiClub</li>
            <li>adiclub Terms and Conditions</li>
          </ul>
        </div>
        <div className="  mb-4">
          <h5 className="fw-bold">COMPANY INFO</h5>
          <ul className="list-unstyled">
            <li>About Us</li>
            <li>adidas Stories</li>
            <li>adidas Apps</li>
            <li>Entity Details</li>
            <li>Press</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <h5 className="fw-bold">FOLLOW US</h5>
        <span className="fs-3">
          <FaSquareInstagram />
        </span>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
