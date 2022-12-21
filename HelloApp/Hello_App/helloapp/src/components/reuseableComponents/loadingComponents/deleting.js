import React from "react";
import "./deleting.scss"
export default function Deleting() {
  return (
    <>
    <div id="deleting_container">
      <div className="cont">
        <div className="paper"></div>
        <button>
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          Deleting
        </button>
        <div className="g-cont">
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
        </div>
      </div>
      </div>
    </>
  );
}
