// privateroute.js

import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../components/login/form";
import { Navigate } from "react-router-dom";

const Privateroute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default Privateroute;
