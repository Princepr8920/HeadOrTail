import React, { useState } from "react";
import "./navbar.scss";
export default function Navbar() {
  const [options, setOptions] = useState(false);

  const navs = [
    { name: "Home", link: "#intro" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  
  return (
    <>
      <nav id="navbar_L">
        <ul>
          {navs.map((nav, i) => {
            return (
              <li key={i}>
                <a href={nav.link} rel="noreferrer">{nav.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        style={{
          height: options ? "200px": "40px", 
          
        }}
        id="navbar_S"
      >
        <button onClick={() => setOptions(!options)}>
          {" "}
          <i className={`fas fa-yin-yang ${options ? "rotate" : ""}`}></i>
        </button>
        <div
          style={{
            visibility: options ? "visible" : "hidden",
            height: options ? "100%" : "0%",
          }}
          id="opt"
        >
          <ul
            style={{
              width: options ? "100%" : "0%",
              height: options ? "100%" : "0%",
            }}
          >
            {navs.map((nav, i) => {
              return (
                <li
                  style={{
                    visibility: options ? "visible" : "hidden",
                    height: options ? "100%" : "0%",
                    opacity: options ? "0.9" : "0",
                  }}
                  key={i}
                >
                  <a href={nav.link}>{nav.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
