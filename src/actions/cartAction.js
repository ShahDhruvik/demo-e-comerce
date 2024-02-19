import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
//send by email
export const loadCart = () => async (dispatch) => {
  try {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    const { email } = localStorageData.user;
    dispatch({ type: "LOAD_CART_REQUEST" });
    const res = await axiosInstance.get(`cart?email=${email}`);
    dispatch({ type: "LOAD_CART_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOAD_CART_FAIL", payload: error });
  }
};
export const addCart = (data) => async (dispatch, getState) => {
  const navigate = useNavigate();
  try {
    const { cart } = getState().cart;
    const existingProduct = cart.find((item) => item.id === data.id);

    if (existingProduct) {
      alert("Product already exists in the cart!");
    } else {
      dispatch({ type: "ADD_CART_REQUEST" });
      const res = await axiosInstance.post("cart", data);
      dispatch(loadCart());
      alert("Product added to cart successfully!");
      navigate("/cart");
      dispatch({ type: "ADD_CART_SUCCESS", payload: res.data });
    }
  } catch (error) {
    dispatch({ type: "ADD_CART_FAIL", payload: error });
    alert("Error adding product to cart.");
  }
};

export const clearCart = (data) => async (dispatch) => {
  dispatch({ type: "CLEAR_CART_REQUEST" });

  try {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item,"DOFDFIOND");
      await axiosInstance.delete(`cart/${item.id}`);
    }

    dispatch({ type: "CLEAR_CART_SUCCESS" });
  } catch (error) {
    dispatch({ type: "CLEAR_CART_FAIL", payload: error });
  }
};

export const updateCart = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CART_REQUEST" });
    const res = await axiosInstance.patch(`cart/${id}`, { quantity });
    dispatch({ type: "UPDATE_CART_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "UPDATE_CART_FAIL", payload: error });
  }
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_CART_REQUEST" });
    console.log(id, "idddd");
    await axiosInstance.delete(`cart/${id}`);
    dispatch({ type: "DELETE_CART_SUCCESS" });
    loadCart();
  } catch (error) {
    dispatch({ type: "DELETE_CART_FAIL", payload: error });
  }
};

