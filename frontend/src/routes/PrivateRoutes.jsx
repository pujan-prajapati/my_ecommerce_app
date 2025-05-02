/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getLocalStore } from "../helpers";

export const PrivateRoute = ({ component }) => {
  let token = getLocalStore("accessToken") ?? "";
  let is_logged_in = token ? true : false;

  return is_logged_in ? component : <Navigate to={"/login"} />;
};

export const AdminPrivateRoute = ({ component }) => {
  let token = getLocalStore("accessToken");
  let user = getLocalStore("user");

  let is_logged_in = token ? true : false;
  let role = null;

  if (user && user["role"]) {
    role = user["role"].toLowerCase();
  }

  return is_logged_in && role === "admin" ? component : <Navigate to={"/"} />;
};
