import React from "react";
import { Outlet } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
export default function Layout() {
  const {
    theme: { darkTheme,theme_profile:{main_background} },
  } = useTheme();
  return (
    <main className={darkTheme ? main_background : main_background }>
      <Outlet />
    </main>
  );
}
