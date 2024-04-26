import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    const { email, username } = localStorageData.user;

    const data = {
      ...values,
      email,
      username,
    };

    try {
      const response = await axiosInstance.get(`/shippingDetails`);
      const existingAddress = response.data;
      const itemExists = existingAddress.some((item) => {
        return item.email === email;
      });
      if (itemExists) {
        alert("Address already exists!");
      } else {
        const submitResponse = await axiosInstance.post(
          "shippingDetails",
          data
        );
        navigate("/checkout");
        console.log(submitResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const initialValues = {
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
  });

  return (
    <div className="max-w-screen-md mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-4 py-5">Shipping Address</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-bold mb-2"
            >
              Full Name
            </label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-blue-500 rounded-md focus:outline-none focus:ring-pink-500"
              placeholder="Enter your full name"
            />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-blue-500 rounded-md focus:outline-none focus:ring-pink-500"
              placeholder="Enter your address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-bold mb-2"
            >
              City
            </label>
            <Field
              type="text"
              id="city"
              name="city"
              className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-blue-500 rounded-md focus:outline-none focus:ring-pink-500"
              placeholder="Enter your city"
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-bold mb-2"
            >
              State
            </label>
            <Field
              type="text"
              id="state"
              name="state"
              className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-blue-500 rounded-md focus:outline-none focus:ring-pink-500"
              placeholder="Enter your state"
            />
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="zipCode"
              className="block text-gray-700 font-bold mb-2"
            >
              Zip Code
            </label>
            <Field
              type="text"
              id="zipCode"
              name="zipCode"
              className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-blue-500 rounded-md focus:outline-none focus:ring-pink-500"
              placeholder="Enter your zip code"
            />
            <ErrorMessage
              name="zipCode"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ShippingForm;
