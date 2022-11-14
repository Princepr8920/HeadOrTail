import React from "react";
import "./navbar.scss";
export default function Navbar() {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <a href="#about">About </a>
          </li>
          <li>
            <a href="#contact">Contact </a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
