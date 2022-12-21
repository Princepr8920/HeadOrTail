import React from "react"; 
import "./profileView.scss";
import useView from "../../../../hooks/useView"; 
import Profile from "../options/profileOpt";
import useTheme from "../../../../hooks/useTheme";
export default function ProfileView() {  
  const {theme:{theme_profile:{components_background}}} = useTheme()
  let {view} = useView()
 
 
  return (
    <section className={`profileView ${components_background}`}>
      {view?.show_Options ? (
        <Profile/>
      ) : (
        <div className="default-items">
          <ul> 
            <li>Last chat with : </li>
            <li>Last chat time : </li>
            <li>Last messgage : </li>
          </ul>
        </div>
      )}
    </section>
  );
}
