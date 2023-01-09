import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {
  return (
    <>
      <section id="home">
        <div className="links_div">
          <img src={require("../../assets/about.png")} alt="about_icon" />
          <Link to="/about">ABOUT</Link>
        </div>
        <div className="links_div">
          <img src={require("../../assets/coin.png")} alt="coin_icon" />
          <Link to="/head-and-tail">HEAD & TAIL</Link>{" "}
        </div>
      </section>
    </>
  );
}
