import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Bag } from "../assets/svg/Bag.svg";
import { ReactComponent as Close } from "../assets/svg/Close.svg";
import { ReactComponent as Hamburger } from "../assets/svg/Hamburger.svg";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextIcon from "../assets/svg/textIcon4.gif";
import { loadCart } from "../actions/cartAction";
import { connect } from "react-redux";

const Navbar = ({cart: { cart, loading: cartLoading, error: cartError },loadCart}) => {

useEffect(() => {
loadCart()
}, [])

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const openLogoutPopUp = () => {
    setPopUpOpen(true);
  };

  const closeLogoutPopUp = () => {
    setPopUpOpen(false);
  };

  const handleLogoutConfirmation = () => {
    closeLogoutPopUp();
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6 w-full flex-col md:flex-row ">
        <div className="flex gap-3">
          <div className="block md:hidden items-start  ">
            <button
              className="flex  items-start px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-black hover:border-white"
              onClick={toggleNavbar}
            >
              {isOpen ? (
                <Close className="h-4 w-auto " />
              ) : (
                <Hamburger className="h-4 w-auto" />
              )}
            </button>
          </div>
          <div className="flex items-center flex-shrink-0 text-black mr-6">
            <img src={TextIcon} alt="" />
          </div>
        </div>
        <div
          className={`w-full flex-grow md:flex text-center md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm md:flex-grow">
            <a
              href="/"
              className="block mt-4 text-sm md:inline-block md:mt-0 text-gray-500 hover:text-black mr-4"
            >
              Home
            </a>
            <a
              href="/about"
              className="block mt-4 text-sm md:inline-block md:mt-0 text-gray-500 hover:text-black mr-4"
            >
              About
            </a>

            <a
              href="/contact"
              className="block mt-4 text-sm md:inline-block md:mt-0 text-gray-500 hover:text-black"
            >
              Contact
            </a>
            <a
              href="/productPage"
              className="block mt-4 px-4 text-sm md:inline-block md:mt-0 text-gray-500 hover:text-black"
            >
              All Products
            </a>
            <a
              href="/myorder"
              className="block mt-4  text-sm md:inline-block md:mt-0 text-gray-500 hover:text-black"
            >
              my Orders
            </a>
          </div>
          <div className="flex md:ml-auto justify-center py-5 md:py-0">
            <div className="flex ">
            <Bag className="h-6" onClick={() => navigate("/cart")} /> 
            {/* <p className="  ">{cart.length}</p> */}
            </div>

            <Button color="primary" onClick={openLogoutPopUp}>
              Logout
            </Button>
            {popUpOpen && (
              <div>
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg relative">
                    <button
                      className="absolute top-0 right-0  mt-2 mr-2"
                      onClick={closeLogoutPopUp}
                    >
                      <Close className="h-7" />
                    </button>
                    <h1 className="text-xl font-bold mb-2 py-10">
                      Are you sure you want to log out??
                    </h1>

                    <div className="justify-evenly flex px-4 space-x-9">
                      <button
                        className="bg-black text-white px-4 py-2 w-full rounded-md"
                        onClick={() => {
                          handleLogoutConfirmation(true);
                          logout();
                        }}
                      >
                        Yes
                      </button>

                      <button
                        className="bg-black text-white px-4 py-2 w-full rounded-md"
                        onClick={() => handleLogoutConfirmation(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => loadCart()(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

