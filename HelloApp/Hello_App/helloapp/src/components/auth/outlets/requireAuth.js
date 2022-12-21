import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/usefulHooks/useAuth";
import React from "react";  

export default function RequireAuth() { 
  let { auth } = useAuth();
  let location = useLocation();
  
  return auth?.user ? (
    <Outlet />
  ) : auth.message === "Account verification pending" ||
    auth.message === "Account password recovery" ? (
    <Navigate to="/verify/user/account" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
