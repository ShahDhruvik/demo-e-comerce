import axios from "axios";
import { createContext, useCallback, useContext, useMemo } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useReducer } from "react";
import productReducer, { productInitialState } from "../reducer/productReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [ProductState, dispatch] = useReducer(
    productReducer,
    productInitialState
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_PRODUCT_REQUEST" });
      const res = await axiosInstance.get("CategoryData");
      //   setProducts(res.data);
      dispatch({ type: "LOAD_PRODUCT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOAD_PRODUCT_FAIL", payload: error });
    }
  }, []);

  const value = useMemo(
    () => ({
      ProductState,
      loadProducts,
    }),
    [ProductState]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
