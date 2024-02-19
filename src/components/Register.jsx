import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password:Yup.string()
  .min(8, 'Password must be 8 characters long')
  .matches(/[0-9]/, 'Password requires a number')
  .matches(/[a-z]/, 'Password requires a lowercase letter')
  .matches(/[A-Z]/, 'Password requires an uppercase letter')
  .matches(/[^\w]/, 'Password requires a symbol')
  .required("Password is required"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required("ConfirmPassword is required"),
});

const Register = () => {
  const { register } = useContext(AuthContext);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-5 absolute sm:mx-auto w-full pl-5 sm:max-w-lg ">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-5xl font-bold">PROSTORE</h1>
        </div>

        <div className="mt-10  ">
          <ToastContainer/>
          <Formik
            initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={register}
           
            validationSchema={SignupSchema}
          >
            {({ errors }) => (
              <Form className="space-y-6">
                {errors.serverError && (
                  <p className="text-red-500 text-2xl text-center ">
                    {errors.serverError}
                  </p>
                )}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      placeholder="UserName"
                      type="text"
                      autoComplete="username"
                      className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    email
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      placeholder="Email-address"
                      type="email"
                      autoComplete="email"
                      className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>

                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="New Password"
                      className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirm-password"
                      placeholder="Confirm Password"
                      className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full pl-5 justify-center rounded-md bg-[#ff5450] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#fc4e4b] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5450]"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Sign In?{" "}
            <a
              href="/auth"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              login Here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
