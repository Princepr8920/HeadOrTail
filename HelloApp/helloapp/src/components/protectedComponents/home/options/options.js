import React from "react";
import "./options.scss"
import { Link } from "react-router-dom";

export default function Options() {
  return (
    <div className="option-list" >
      <ul>
        <li>
          <Link className="options" to="/" >
            New group
          </Link>
        </li>
        <li>
          <Link
            className="options"
            to="#list-messages"
            role="tab"
            aria-controls="list-messages"
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            className="options"
            to="#list-messages"
            role="tab"
            aria-controls="list-messages"
          >
            Starred messages
          </Link>
        </li>
        <li>
          <Link
            className="options"
            to="/profile"
            role="tab"
            aria-controls="list-messages"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
