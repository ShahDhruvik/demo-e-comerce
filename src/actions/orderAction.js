import axiosInstance from "../utils/AxiosInstance";

export const loadOrders = (email) => async (dispatch) => {
    try {
      dispatch({ type: "LOAD_ORDERS_REQUEST" });
      const res = await axiosInstance.get(`orders?email=${email}`); 
     
      dispatch({ type: "LOAD_ORDERS_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOAD_ORDERS_FAILURE", payload: error });
    }
  };

export  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000; 
    const orderId = `#${randomNumber}`; 
  
    return orderId;
  };
  
  export const postOrder = (orderDetails) => async (dispatch) => {
    try {
      dispatch({ type: "POST_ORDER_REQUEST" });
      const localStorageData = JSON.parse(localStorage.getItem("token"));
      const { email } = localStorageData.user;
     
      const {id,...CartDataWithoutID}=orderDetails
      console.log(CartDataWithoutID,"sdfpodjfpodgpodgdpf");
      const orderID = generateOrderId(); // Function to generate an order ID
      const orderData = {
        ...CartDataWithoutID,
        orderID: orderID,
        email: email,
      };
      const res = await axiosInstance.post("orders", orderData);
      dispatch({ type: "POST_ORDER_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "POST_ORDER_FAILURE", payload: error });
    }
  };
  