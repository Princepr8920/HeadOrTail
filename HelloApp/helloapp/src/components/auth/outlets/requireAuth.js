import { useLocation, Outlet, Navigate } from "react-router-dom";
import { ViewProvider } from "../../../context/ViewContext";
import useAuth from "../../../hooks/useAuth";
import React from "react";

export default function RequireAuth() {
  let { auth } = useAuth();
  let location = useLocation();
  
  console.log("auth required");

  return auth?.user ? (
    <ViewProvider>
      <Outlet />
    </ViewProvider>
  ) : auth.message === "Account verification pending" ||
    auth.message === "Account password recovery" ? (
    <Navigate to="/verify/user/account" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
