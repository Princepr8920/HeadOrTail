import React from "react";
import useAuth from "../../../hooks/usefulHooks/useAuth";
import { Navigate, Outlet,useLocation} from "react-router-dom";

export default function UserVerification() {
  const { auth } = useAuth();
  let location = useLocation();
  let recover = document.cookie.split("=")[1];

  return auth.message === "Account verification pending" || auth.success || recover ? (
    <Outlet />
  )  : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}


