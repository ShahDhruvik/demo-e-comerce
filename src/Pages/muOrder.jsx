import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import EmptyCart from "../assets/images/empty-cart.png";
import ReviewBox from "../components/ReviewBox";
import { useNavigate } from "react-router-dom";

const Myorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState({});
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);


const navigate=useNavigate()
  
  const fetchOrders = async () => {
    try {
      
      const localStorageData = JSON.parse(localStorage.getItem('token'));
      const { email } = localStorageData.user;
      const response = await axiosInstance.get(`orders?email=${email}`);
      console.log(response.data,"dsnd");
      const getAddress= await axiosInstance.get(`shippingDetails?email=${email}`);
      const Odata=getAddress.data
      const itemExists = Odata.some((item) => {
        return item.email === email;
      });
      if (itemExists) {
       console.log("alreadt have product");
      } else {
          console.log("NEW ");
      }
      setAddress(getAddress.data[0])

      setOrders(response.data)
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
    
  }, []);


  return (
    <div className="container mx-auto p-4 max-w-screen-lg  ">
          {orders.length > 0 &&
          <>
      <h1 className="text-3xl font-bold py-5 ">Your Orders({orders.length})</h1>
      <div>
        <h1 className="font-semibold underline text-2xl pt-4 md:pt-10 ">Shipping Address</h1>
        <div className="my-7 py-2 px-5 border rounded-md border-black ">
        <p ><span className="font-bold text-xl">Full Name:</span> {address.fullName}</p>
      <p ><span className="font-bold text-xl">Address:</span> {address.address}</p>
      <p ><span className="font-bold text-xl">City: </span>{address.city}</p>
      <p ><span className="font-bold text-xl">State:</span> {address.state}</p>
      <p ><span className="font-bold text-xl">Zip Code:</span> {address.zipCode}</p>
      <p ><span className="font-bold text-xl">Email:</span> {address.email}</p>
      </div>
     
      </div>
      </>
          }
      <h1 className="text-2xl font-semibold py-3  max-w-screen-xl mx-auto underline ">Your Products</h1>

      {orders.length > 0 ? (
     orders.map((order) => {
      const firstProduct = order.product[0]; // Get the first product
      return (
        <div
          className="px-5 my-4  bg-white rounded-lg text-center flex-col md:flex-row py-5 md:text-start shadow-lg overflow-hidden flex"
          key={order.id}
          onClick={() => navigate(`/orderSummery/${order.id}`)}
        >
          <img
            src={firstProduct.image}
            alt="Product"
            className="w-36 aspect-[3/4] mx-auto md:mx-0 rounded-lg"
          />
        <div className="p-4 flex w-full flex-col  ">
            <div className="flex justify-between">
             <h2 className="md:text-xl  text-start  font-bold mb-2">
               {firstProduct.categoryName}
              <p className="md:text-sm text-xs text-start text-slate-600">{order.orderDate}</p>
             </h2>
          
             <p className="text-gray-700">
               
               <span className="font-bold md:text-lg">
                 {new Intl.NumberFormat("en-IN", {
                   currency: "INR",
                   style: "currency",
                 }).format(firstProduct.price)}
               </span>
             </p>
             </div>

             <p className="text-gray-700 text-start">
               {firstProduct.caption}
             </p>
             <div className="flex justify-between md:justify-normal md:gap-2">
             <p className=" text-gray-700">
               Quantity:
             </p>
             <p> {firstProduct.quantity}</p>
             </div>
           </div>
        </div>
      );
    })
    
      ) : (
        <>
          <div>
            <img
              src={EmptyCart}
              alt="cart is emty"
              className="aspect-square mx-auto"
            />
            <h1 className="text-center text-3xl font-mono text-slate-600">
              No Orders yet
            </h1>
          </div>

        </>
      )}
    </div>
  );
};

export default Myorder;
