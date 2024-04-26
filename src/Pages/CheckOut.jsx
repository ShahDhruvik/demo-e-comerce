/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCart, clearCart, loadCart } from "../actions/cartAction";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import { ReactComponent as Loader } from "../assets/svg/Loader (2).svg";
import { postOrder } from "../actions/orderAction";

const Checkout = ({
  cart: { cart, loading: cartLoading },
  loadCart,
  clearCart,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);
  if (cartLoading) {
    return (
      <h1>
        <Loader />
      </h1>
    );
  }

  // if (cartError) {
  //   return <h1>problem in cart</h1>;
  // }

  // eslint-disable-next-line react/prop-types
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const orderId = `#${randomNumber}`;

    return orderId;
  };


  const placeOrder = async () => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("token"));
      const { email, username } = localStorageData.user;
      const res = await axiosInstance.get("/cart");
      const dataWithId=res.data
      const Odata = dataWithId.map(({  ...rest }) => rest);

      const formattedData = Odata.map((element) => ({
        image: element.image,
        categoryName: element.categoryName,
        caption: element.caption,
        price: element.price,
        quantity: element.quantity,
      }));

      const orderID = generateOrderId();
      const currentDate = new Date();

      const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

      const formattedDate = currentDate.toLocaleString("en-US", dateOptions);
      const formattedTime = currentDate.toLocaleString("en-US", timeOptions);

      const data = {
        product: formattedData,
        email,
        username,
        orderID,
        subtotal,
        orderDate: `${formattedDate} ${formattedTime}`,

      };

      await axiosInstance.post("orders", data);
      toast.success("Order Placed Successfully...");
      clearCart(dataWithId);
      console.log(!!clearCart(dataWithId),"check if the product is deleted or not");
      setOpen(true);
    } catch (error) {
      console.log("Error placing order:", error);
    }
  };
  return (
    <div className="container  mx-auto max-w-screen-lg py-8 ">
      <ToastContainer />
       <h1 className="text-3xl font-bold py-5 ">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col p-5 max-w-screen-lg mx-auto justify-evenly">
        <table className="w-full">
          <tbody className="text-center p-5 rounded-md flex flex-col space-y-5 w-full justify-center md:justify-normal">
            {cart.map((item) => (
              <tr key={item.id} className="flex  shadow-md bg-gray-100 text-xl md:p-5 p-2 md:flex-row">
                <td className="md:px-4 md:py-2">
                  <img
                    src={item.image}
                    alt={item.categoryName}
                    className="md:w-48 sm:w-24 w-24  h-auto mx-auto rounded-md shadow-lg"
                  />
                </td>
                <td className="flex  px-4  w-full  items-start justify-between">
                  <div className=" justify-between w-full py-2 space-y-2">
                    <div className="flex   justify-between">
                    <div className="font-bold text-sm sm:text-lg md:text-2xl">{item.categoryName}</div>
                    <div className="  text-sm sm:text-lg font-bold">
                   
                    {new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                      style: "currency",
                    }).format(item.price)}
                  </div>
                  </div>
                    <div className="flex flex-col">
                    <div className=" text-start font-semibold text-sm md:text-base">{item.caption}</div>
                    <div className="pt-2 text-sm md:text-base text-start font-semibold block">
                      Quantity: {item.quantity}
                    </div>
                    </div>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col w-full ml-auto mt-8 max-w-md space-y-10 bg-gray-100 p-5 rounded-md">
          <div className="flex flex-col">
            <div className="flex justify-between font-bold">
              <p className="mr-4">Subtotal:</p>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  style: "currency",
                }).format(subtotal.toFixed(2))}
              </p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Delivery:</p>
              <p>
                Free<span className="line-through font-normal text-slate-600 px-2">
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format("90")}
                </span>
              </p>
            </div>
          </div>
          <button
            className="bg-blue-500 w-full text-white px-4 py-2 rounded mx-auto md:mx-0"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
        {open && (
          <div>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg relative">
                <h1 className="text-xl font-bold mb-2 py-5 md:py-10">
                  Your Order has been placed😊😊😊
                </h1>
                <div className="justify-evenly flex flex-col md:flex-row space-y-2 md:space-y-0 px-4 md:gap-4">
                  <button
                    className="bg-black text-white px-4 py-2 w-full md:w-[50%] text-sm rounded-md"
                    onClick={() => navigate("/")}
                  >
                    Back To home
                  </button>
                  <div>
                  <button
                    className="bg-black text-white px-4 py-2 w-full text-sm rounded-md"
                    onClick={() => navigate("/productPage")}
                  >
                    See More products
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => loadCart()(dispatch),
    clearCart: (data) => clearCart(data)(dispatch),
    addCart: (data) => addCart(data)(dispatch),
    postOrder: (orderDetails) => postOrder(orderDetails)(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
