
export const productInitialState = {
  products: [],
  productBycategory:[],
  loading: false,
  error: null,
};

export default (state=productInitialState, { type, payload }) => {


  switch (type) {
    case "LOAD_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "LOAD_PRODUCT_SUCCESS":
      return { ...state, loading: false, products: payload ,productBycategory:payload };
    case "LOAD_PRODUCT_FAIL":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
