import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../../hooks/usefulHooks/useTheme";
import "../../../reuseable.scss";

export default function Header({ name, link, backClick }) {
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();

  return (
    <>
      <div className={`${components_background} Header`}>
        <div className="back">
          {link ? (
            <Link className="backButton" to="/">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
          ) : (
            <button className="backButton" onClick={backClick}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <h4>{name}</h4>
      </div>
    </>
  );
}
