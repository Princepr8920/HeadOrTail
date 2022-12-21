import React from "react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useTheme from "../../hooks/usefulHooks/useTheme";
import useView from "../../hooks/usefulHooks/useView";

export default function Layout() {
  const { pathname } = useLocation();
  const { setView } = useView();
  const {
    theme: {
      darkTheme,
      theme_profile: { main_background },
    },
  } = useTheme();

  useEffect(() => {
    function security() { 
      if (pathname !== "/edit") {
        setView((rest) => ({ ...rest, isUnlocked: false }));
      }
    }
    return () => security();
  }, [pathname]);

  return (
    <main className={darkTheme ? main_background : main_background}>
      <Outlet />
    </main>
  );
}
