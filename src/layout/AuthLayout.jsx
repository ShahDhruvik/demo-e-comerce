import  { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (user) {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
