import React from "react";


export default function Info({ info, green }) {
  return (
    <>
      <div className={green ? "INFO green" : "INFO"}>
        <p>
          {info}
        </p>
      </div> 
    </>
  );
}
