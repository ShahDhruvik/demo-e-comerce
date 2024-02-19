export const orderInitialState = {
    orders: [],
    loading: false,
    error: null,
  };
  
  export default (state = orderInitialState, { type, payload }) => {
    switch (type) {
      case "LOAD_ORDERS_REQUEST":
        return { ...state, loading: true };
      case "LOAD_ORDERS_SUCCESS":
        return { ...state, loading: false, orders: payload };
      case "LOAD_ORDERS_FAILURE":
        return { ...state, loading: false, error: payload };
      default:
        return state;
    }
  };
  
  