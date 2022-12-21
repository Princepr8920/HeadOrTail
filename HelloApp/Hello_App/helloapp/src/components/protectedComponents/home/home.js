import React from "react";
import "./home.scss";
import Navbar from "./navbar/Navbar";
import Contacts from "./contacts/contacts";
import ProfileView from "./liveView/view";
import StatusView from "./status/status"; 

export default function HOME() { 
  return (
    <div id="home">
      <Navbar />
      <section id="homeLayout">
        <Contacts />
        <div id="liveView">
          <StatusView />
          <ProfileView />
        </div>
      </section>
    </div>
  );
}
