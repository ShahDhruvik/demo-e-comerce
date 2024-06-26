import  { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
