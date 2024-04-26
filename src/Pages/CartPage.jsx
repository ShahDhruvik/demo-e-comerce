/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Close } from "../assets/svg/Close.svg";
import { ReactComponent as Delete } from "../assets/svg/del.svg";
import EmptyCart from "../assets/images/empty-cart.png";

import {
  loadCart,
  deleteCart,
  updateCart,
} 
from "../actions/cartAction";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

const CartPage = ({
  cart: { cart },
  loadCart,
  deleteCart,
}) => {
  const [deletePopupOpen, sediveletePopupOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  const navigate = useNavigate();

  const handleClear = async () => {
    try {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        await axiosInstance.delete(`cart/${item.id}`);
      }
      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [loadCart]);

 

  const openDeletePopUp = (item) => {
    setSelectedCartItem(item);
    sediveletePopupOpen(true);
  };

  const closeDeletePopUp = () => {
    sediveletePopupOpen(false);
  };

  const handleDeleteConfirmation = () => {
    closeDeletePopUp();
  };

  const handleClick = async (productId, quantity, type) => {
    let newQuantity = quantity;
    if (type === "increment") {
      newQuantity++;
    } else if (type === "decrement" && newQuantity > 1) {
      newQuantity--;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/cart/${productId}`,
        { quantity: newQuantity }
      );
      console.log("Quantity updated successfully!", response.data);
      console.log("New quantity:", newQuantity);
    } catch (error) {
      console.log("Error:", error);
    }

    loadCart();
  };
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCart = async () => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("token"));
      const { email } = localStorageData.user;
      const checkAddressData = await axiosInstance.get("shippingDetails");
      const Odata = checkAddressData.data;

      const itemExists = Odata.some((item) => {
        return item.email === email;
      });
      if (itemExists) {
        navigate("/checkout");
      } else {
        navigate("/shippingForm");
      }
    } catch (error) {
      console.log("error, in checkout button");
    }
  };

  return (
    <div className="container py-4 overflow-hidden max-w-screen-2xl mx-auto">
      <div className="flex justify-between ">
        <h1 className="text-3xl md:text-4xl font-bold p-5 mb-4">Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div>
          <img
            src={EmptyCart}
            alt="cart is empty"
            className="aspect-square mx-auto"
          />
          <h1 className="text-center text-3xl font-mono text-slate-600">
            Your cart is empty
          </h1>
        </div>
      ) : (
        <div className="my-10">
          <div className="flex  md:flex-row justify-between max-w-screen-lg gap-2 md:gap-5 pb-4">
            {cart.length > 0 && (
              <div>
                <button
                  className="bg-blue-700 hover:bg-green-800 duration-500 text-sm md:text-base text-white px-4 py-2 rounded"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            )}
            <div>
              <button
                className="bg-blue-700 hover:bg-red-500 text-sm md:text-base duration-500 text-white px-7 py-2 rounded"
                onClick={handleClear}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="flex flex-col mx-auto md:flex-row gap-7 ">
            <div className="table-auto w-full max-w-screen-lg border-black border-b">
              <div className="text-center mx-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex  shadow-md bg-gray-100 text-xl md:p-5 p-2 md:flex-row"
                  >
                    <div className="md:px-4 md:py-2">
                      <img
                        src={item.image}
                        alt={item.categoryName}
                        className="md:w-48 sm:w-24 w-32  h-auto mx-auto rounded-md shadow-lg"
                      />
                    </div>
                    <div className="justify-between w-full py-2 space-y-2 pl-3">
                      <div className="flex justify-between ">
                        <div className="font-bold text-sm sm:text-lg text-start md:text-2xl">
                          {item.categoryName}{" "}
                          <div className="text-base font-normal line-clamp-1">
                            {item.caption}
                          </div>
                        </div>

                        <div className="px-4 py-2 text-sm sm:text-lg text-end md:text-xl font-semibold">
                          {new Intl.NumberFormat("en-IN", {
                            currency: "INR",
                            style: "currency",
                          }).format(item.price)}
                        </div>
                      </div>
                      <div className="md:px-4 py-2 flex justify-between w-full">
                        <div className="flex items-center justify-center">
                          <button
                            className="bg-blue-500 text-white px-2  md:px-3 md:py-1 rounded-l"
                            onClick={() => {
                              handleClick(item.id, item.quantity, "decrement");
                            }}
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="bg-blue-500 text-white px-2  md:px-3 md:py-1 rounded-r"
                            onClick={() => {
                              handleClick(item.id, item.quantity, "increment");
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="px-4 py-2">
                          <button
                            className="bg-red-500   flex text-white text-base md:px-4  py-1 md:py-2 rounded"
                            onClick={() => openDeletePopUp(item)}
                          >
                            <Delete className="h-5 md:hidden  flex fill-white" />
                            <span className="hidden md:block">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {deletePopupOpen && selectedCartItem && (
                  <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-lg relative">
                        <button
                          className="absolute top-0 right-0 mt-2 mr-2"
                          onClick={closeDeletePopUp}
                        >
                          <Close className="h-7" />
                        </button>
                        <h1 className="text-xl font-bold mb-2 py-10">
                          Are you sure you want to remove this product??
                        </h1>

                        <div className="justify-evenly flex px-4 space-x-9">
                          <button
                            className={`bg-black text-white px-4 py-2 w-full rounded-md`}
                            onClick={() => {
                              deleteCart(selectedCartItem.id);
                              loadCart();
                              closeDeletePopUp();
                            
                            }}

                          >
                            Yes
                          </button>

                          <button
                            className="bg-black text-white px-4 py-2 w-full rounded-md"
                            onClick={() => handleDeleteConfirmation(false)}
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
            <div className="w-full max-w-md  bg-gray-100  h-fit ml-auto p-5 rounded-md">
              <div className="flex justify-between pb-10">
                <p className=" font-semibold text-lg ">Total:</p>
                <p className=" font-semibold text-lg">
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format(subtotal.toFixed(2))}
                </p>
              </div>
              <div className="flex justify-center mt-4 md:mt-0 ">
                <button
                  className="bg-green-500 text-white px-4 w-full py-2 rounded"
                  onClick={handleCart}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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
    deleteCart: (id) => deleteCart(id)(dispatch),
    updateCart: ({ id, quantity }) => updateCart(id, quantity)(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
