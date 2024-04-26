import { createContext, useCallback, useMemo, useReducer } from "react";
import cartReducer, { cartInitialValue,  } from "../reducer/cartReducer";
import axiosInstance from "../utils/AxiosInstance";
export const CartContext = createContext();


// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [CartState, dispatch] = useReducer(cartReducer, cartInitialValue)



  const loadCart = useCallback(async() => {

    try {
        dispatch({ type: "LOAD_CART_REQUEST" });
        const res = await axiosInstance.get("cart");
        dispatch({ type: "LOAD_CART_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "LOAD_CART_FAIL", payload: error });
      }

  }, []);


  const addCart = useCallback(async(data) => {
    try {
        dispatch({ type: "ADD_CART_REQUEST" });
        const res = await axiosInstance.post("cart",data);
        dispatch({ type: "ADD_CART_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "ADD_CART_FAIL", payload: error });
      }

  }, []);
  const updateCart = useCallback(async(data) => {

    try {
        dispatch({ type: "UPDATE_CART_REQUEST" });
        const res = await axiosInstance.put(`cart/${data.id}`,data);
        dispatch({ type: "UPDATE_CART_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "UPDATE_CART_FAIL", payload: error });
      }

  }, []);
  const deleteCart = useCallback(async(data) => {
    try {
        dispatch({ type: "DELETE_CART_REQUEST" });
        await axiosInstance.put(`cart/${data.id}`,data);
        dispatch({ type: "DELETE_CART_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "DELETE_CART_FAIL", payload: error });
      }
  }, []);

  const value = useMemo(() => ({
    CartState,
    loadCart,
    addCart,
    updateCart,
    deleteCart
  }), [CartState]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
