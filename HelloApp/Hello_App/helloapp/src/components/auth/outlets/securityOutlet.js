import React from "react";
import { Outlet } from "react-router-dom";
import useView from "../../../hooks/usefulHooks/useView"; 
import SecurityLock from "../../protectedComponents/security/securityLock"; 

export default function SecurityOutlet() {
  const { view } = useView();
  return view.isUnlocked ? <Outlet /> : <SecurityLock />;
}
