import React from "react";
import { Link } from "react-router-dom"; 
import "./options.scss";
import useLogout from "../../../../hooks/httpHooks/useLogoutHook";
import useTheme from "../../../../hooks/usefulHooks/useTheme";
import useAuth from "../../../../hooks/usefulHooks/useAuth";

export default function Options() {
  const { auth,setAuth } = useAuth();
  const LOGOUT = useLogout();

  const options = [
    { name: "New group", icon: "group.png", link: "" },
    { name: "Starred messages", icon: "star.png", link: "" },
    { name: "Favorites", icon: "favorite.png", link: "" },
    { name: "Settings", icon: "settings.png", link: "" }, 
  ];
 
  const {
    theme: {
      darkTheme,
      theme_profile: { components_background },
    },
    setTheme,
  } = useTheme();

  function handleTheme(e) {
    e.stopPropagation();
    setTheme({
      darkTheme: !darkTheme,
      theme_profile: {
        main_background: darkTheme ? "light" : "dark",
        components_background: darkTheme
          ? "components_light_theme"
          : "components_dark_theme",
      },
    }); 
  }

  let themeIcon = darkTheme ? "moon.png" : "sun.png";
  return (
    <>
      <div id="all_options">
        <div id="my_profile_div">
          <div id="dp_in_options">
            <img src={auth?.user?.picture} alt="profile_img" />
          </div>

          <div id="manage_profile">
            <h5>{auth?.user?.username}</h5>
            <p>{auth?.user?.email}</p>

            <div id="profileLink">
              <Link to="/edit">Manage your HelloApp Account</Link>
            </div>
          </div>
        </div>

        <div className="option-list">
          <ul>
            {options.map((e, i) => {
              return (
                <li key={i}>
                  <Link
                    className="options"
                    to="/"
                    role="tab"
                    aria-controls="list-messages"
                  >
                    <img
                    className="opt_icon"
                      src={require(`../../../../assets/icons/${e.icon}` )}
                      alt={e.name}
                    />
                    {e.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                className="options logout_Button"
                role="tab"
                onClick={() => LOGOUT()}
                aria-controls="list-messages"
              >
                <img className="opt_icon" src={require("../../../../assets/icons/logout.png")} alt="_logout" />
                Logout
              </button>
            </li>
          </ul>
          <div className="toggles">
          <input
                  type="image"
                  id="dark_mode_btn" 
                  onClick={handleTheme} 
                  src={require(`../../../../assets/icons/${themeIcon}`)}
                  alt="profile_img"
                />
          </div>
        </div>
      </div>
    </>
  );
}
