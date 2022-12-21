import React from "react";

export default function ERROR({ error }) {
  return (
    <>
      <div className="ERROR">
        {error ? (
          <p>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            {error.message}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
