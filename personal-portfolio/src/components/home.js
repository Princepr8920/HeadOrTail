import React from "react";
import "./home.scss";
export default function Home() {
  

  return (
    <>
      <section className="intro">
        {/* <hr id="top_line" /> */}

        <div id="first_look">
          

          <div id="name_intro">
            <h1 id="name">Hey I am Prince</h1>
            <span>a web developer</span>
          </div>
          <img
            id="prince_img"
            src={require("../assets/prince.jpg")}
            alt="prince_img"
          />
        </div>
        {/* <div id="about_projects">helllllllllllllllo</div>     */}
      </section>
    </>
  );
}
