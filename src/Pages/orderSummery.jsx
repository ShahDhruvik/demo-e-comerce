import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import axios from "axios";
import ReviewBox from "../components/ReviewBox";

const OrderSummery = () => {
  //   const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [getOrderID, setGetOrderID] = useState("")
  const [address, setAddress] = useState({})
  const { id } = useParams();
  console.log(id);
  // useEffect(() => {
  //     const localStorageData = JSON.parse(localStorage.getItem('token'));
  //         const { email } = localStorageData.user;
  //         loadOrders(email);
  //         console.log(loadOrders(email),"eeeeeeeeeeeeeee");
  // }, [])

  useEffect(() => {
    GetPerticularData();
  }, []);

  const GetPerticularData = async () => {
    try {
        const localStorageData = JSON.parse(localStorage.getItem("token"));
        const { email } = localStorageData.user;
      const response = await axios.get(`http://localhost:3000/orders/${id}`);
      console.log(response.data.product,"fndfnfdf");
      setProducts(response.data.product);
      setGetOrderID(response.data)


        const getAddress= await axiosInstance.get(`shippingDetails?email=${email}`);
        const Odata=getAddress.data[0]
        setAddress(Odata)
        console.log(Odata,"nsdfnsdf");
      //   const itemExists = Odata.some((item) => {
      //     return item.email === email;
      //   });
      //   if (itemExists) {
      //    console.log("alreadt have product");
      //   } else {
      //       console.log("NEW ");
      //   }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="md:flex  md:justify-between max-w-screen-lg md:mx-auto">
        <h1 className='md:text-3xl text-lg font-bold'> Order Summery</h1>
        <h1 className=" md:text-2xl text-slate-500 py-5 ">Order&nbsp; {getOrderID.orderID} <span className="font-bold text-black">({products.length}) </span> </h1>
      </div>

      <div className="grid  gap-5 max-w-screen-lg mx-auto  ">
        {products.map((x,i) => (
           <div
           className="  px-5 my-4  bg-white rounded-lg text-center flex-col md:flex-row py-5 md:text-start shadow-lg overflow-hidden flex"
           key={i}
         >
           <img
             src={x.image}
             alt="Product"
             className="w-36 aspect-[3/4] mx-auto md:mx-0 rounded-lg"
           />
           <div className="p-4 md:flex w-full flex-col space-y-3 md:space-y-0  ">
            <div className="md:flex justify-between">
             <h2 className="text-xl font-bold mb-2">
               {x.categoryName}
             </h2>
             <p className="text-gray-700">
               
               <span className="font-bold">
                 {new Intl.NumberFormat("en-IN", {
                   currency: "INR",
                   style: "currency",
                 }).format(x.price)}
               </span>
             </p>
             </div>
             <p className="text-gray-700">
               {x.caption}
             </p>
             <p className="text-gray-700">
               Quantity: {x.quantity}
             </p>
           </div>
         </div>
        ))}
      </div>
      <div className="md:mx-auto md:max-w-screen-lg">
        <div >
      <h1 className="md:text-3xl text-lg font-bold py-5 ">Order Details</h1>
</div>
<div className="flex flex-col gap-4">
   
    <div className="flex justify-between text-sm   md:text-xl  ">
   <p className="w-full"> Delivery Address</p>
   <p className="font-bold w-28 md:w-full text-end ">{address.address}</p>
   </div>
   <div className="flex justify-between text-sm md:text-xl  ">
   <p>ZipCode</p>
   <p className="font-bold ">{address.zipCode}</p>
   </div>
    <div className="flex justify-between text-sm md:text-xl  ">
   <p>Invoice</p>
   <p className="font-bold ">INVOICE</p>
   </div>
   <hr/>
   <div className="flex justify-between text-sm md:text-xl ">
   <p>Total</p>
   <p className="font-bold text-blue-600 "> {new Intl.NumberFormat("en-IN", {
                   currency: "INR",
                   style: "currency",
                 }).format(getOrderID.subtotal)}</p>
   </div>
</div>


      </div>
      <ReviewBox/>
    </div>
  );
};

export default OrderSummery;
