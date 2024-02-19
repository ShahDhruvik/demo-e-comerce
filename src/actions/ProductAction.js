import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

export const loadProducts = () => async (dispatch) => {

  try {
    dispatch({ type: "LOAD_PRODUCT_REQUEST" });
    const res = await axiosInstance.get("CategoryData");
    dispatch({ type: "LOAD_PRODUCT_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOAD_PRODUCT_FAIL", payload: error });
  }
};

export const categoryProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_PRODUCT_REQUEST" });
    const res = await axiosInstance.get(`CategoryData?type=${category}`);
    dispatch({ type: "CATEGORY_PRODUCT_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "CATEGORY_PRODUCT_FAIL", payload: error });
  }
};

