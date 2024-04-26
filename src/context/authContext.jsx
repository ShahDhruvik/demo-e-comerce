/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const login = useCallback(async (values, actions) => {
    try {
      const response = await axiosInstance.post("login", {
        email: values.email,
        password: values.password,
      });
      const json = response.data;
      console.log(response, "check");

      localStorage.setItem("token", JSON.stringify(json));
      toast.success("login Successful");
      setUser(json);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({
        serverError: error.response.data.message || "Invalid email or password.",
      });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  const register = useCallback(async (values, actions) => {
    try {
      const { confirmPassword, ...rest } = values;
      console.log(rest, "check");

      const response = await axiosInstance.post("register", rest);
      const json = response.data;
      console.log(json, "check");

      localStorage.setItem("token", JSON.stringify(json));
      toast.success("Register Successful");
      setUser(json);

      actions.resetForm();
      console.log(response, "check");
    } catch (error) {
      actions.setErrors({
        serverError: error.response.data.message || "This email is  already exists.",
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
