import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/usefulHooks/useAuth";
import useTheme from "../../../../hooks/usefulHooks/useTheme";
import useView from "../../../../hooks/usefulHooks/useView";
import "./navbar.scss";

export default function Navbar() {
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();

  
  const { auth } = useAuth();
  let { view, setView } = useView();
  let [getValue, setValue] = useState({ 
    currentUser: auth?.user || null,
  });
 
  function handleClick(e){
    e.stopPropagation();
    setView((rest) => ({
      ...rest,
      show_Options: !view.show_Options,
     toggle:!view.toggle
    }))
  }

  return (
    <>
      <nav className={`navbar ${components_background}`}>
        <div className="container-fluid">
          <Link className="App_name" to="/">
            HelloApp
          </Link>

          <div id="profile-icon">
            <input
              type="image"
              className="profile_img"
              onClick={handleClick}
              src={getValue.currentUser?.picture}
              alt="profile_img"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
