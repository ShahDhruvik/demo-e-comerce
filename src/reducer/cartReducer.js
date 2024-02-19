export const cartInitialValue = {
  loading: false,
  error: null,
  cart: [],
};

export default (state = cartInitialValue, { type, payload }) => {
  switch (type) {
    case "LOAD_CART_REQUEST":
    case "ADD_CART_REQUEST":
    case "UPDATE_CART_REQUEST":
    case "DELETE_CART_REQUEST":
    // case "CLEAR_CART_REQUEST":
      return { ...state, loading: true };

    case "LOAD_CART_SUCCESS":
      return { ...state, loading: false, cart: payload };

    case "ADD_CART_SUCCESS":
      return { ...state, loading: false, cart: [...state.cart, payload] };

    case "UPDATE_CART_SUCCESS": {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        cart: [
          ...state.cart.slice(0, index),
          payload,
          ...state.cart.slice(index + 1),
        ],
      };
    }
    case "DELETE_CART_SUCCESS": {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
      };
    }
    // case "CLEAR_CART_SUCCESS":
    //   return { ...state, loading: false, cart: [] };

    case "LOAD_CART_FAIL":
    case "ADD_CART_FAIL":
    case "UPDATE_CART_FAIL":
    case "DELETE_CART_FAIL":
    // case "CLEAR_CART_FAIL":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
