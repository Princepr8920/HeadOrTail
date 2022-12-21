import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useTheme from "../../../../hooks/useTheme";
import useView from "../../../../hooks/useView";
import "./navbar.scss";
 
export default function Navbar({ toggle,clickHandler }) {
  const {theme:{theme_profile:{components_background}}} = useTheme()
  const { auth } = useAuth();
  let { view,setView } = useView();
  let [getValue, setValue] = useState({
    searchValue: "", 
    currentUser: auth.user || null, 
  });
 
  return (
    <>
      <nav className={`navbar ${components_background}`}>
        <div className="container-fluid">
          <Link className="App_name" to="/">
            HelloApp
          </Link>

          <div id="icons">
            <div id="profile-icon">
              <div id="profile">
                <input
                  type="image"
                  className="profile_img"
                  onClick={()=>setView((rest) => ({ ...rest, show_Options: !view.show_Options }))}
                  src={getValue.currentUser.picture}
                  alt="profile_img"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
