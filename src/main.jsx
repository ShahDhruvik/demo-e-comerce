import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AuthLayout from "./layout/AuthLayout";
import Login from "./components/Login.jsx";
import Register from "./components/Register";
import MainLayout from "./layout/MainLayout";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/CheckOut";
import { AuthProvider } from "./context/authContext";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "./reducer";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Myorder from "./Pages/muOrder";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ShippingForm from "./Pages/ShippingForm";
import OrderSummery from "./Pages/orderSummery";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shippingForm" element={<ShippingForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorder" element={<Myorder />} />
        <Route path="/orderSummery/:id" ex element={<OrderSummery />} />
      </Route>
      <Route
        path="/auth"
        element={
          <AuthProvider>
            <AuthLayout />
          </AuthProvider>
        }
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);
const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId="817949669616-6qt97mo3a3bgesclj6v981lnarauf3n6.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </>
);
