// eslint-disable-next-line no-unused-vars
import { Formik, Form, Field, ErrorMessage } from "formik";
import  { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useContext(AuthContext);


   return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-5 absolute  mx-auto w-full sm:max-w-lg ">
        <div className="mx-auto max-w-lg flex" >
       
          <h1 className="text-center text-5xl font-bold">PROSTORE</h1>
        </div>

        <div className="mt-10  ">
          <div>
          <ToastContainer/>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={login}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "Email is required";
              }

              if (!values.password) {
                errors.password = "Password is required";
              }

              return errors;
            }
          }
          
          >
            {({ errors }) => (
              <Form className="space-y-6  ">
                {errors.serverError && (
                  <p className="text-red-500 text-2xl text-center">
                    {errors.serverError}
                    
                  </p>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    email
                  </label>
                  <div className="mt-2 ">
                    <Field
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#ff5450] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
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
                    <div className="text-base">
                      <a href="#" className="font-semibold text-black ">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      placeholder="Enter your Password"
                      type="password"
                      autoComplete="current-password"
                      
                      className="block w-full rounded-md pl-5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#ff5450] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff5450] sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#ff5450] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#fc4e4b] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5450]"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Sign In?{" "}
            <a
              href="/auth/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register Here
            </a>
          </p>
        </div>
      </div>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      </div>
    </>
  );
};

export default Login;



