import React from "react";
import "./home.scss";
import Navbar from "./navbar/Navbar";
import Contacts from "./contacts/contacts";
import ProfileView from "./profile/profileView";
import StatusView from "./status/status";
//import { Link } from "react-router-dom";  
import useView from "../../../hooks/useView"

export default function HOME({ toggle, clickHandler ,val}) {
 // let {view} = useView()
  return (
    <div id="home"> 
        <Navbar toggle={toggle} clickHandler={clickHandler} />
        <section id="homeLayout">
          <Contacts />
          <div id="liveView">
            <ProfileView/>
            <StatusView/> 
          </div>
        </section> 
    </div>
  );
}
