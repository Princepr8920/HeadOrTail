import React from "react";

export default function ERROR({ error }) {
  let setErrors = !error
    ? error
    : Array.isArray(error)
    ? error
    : [{ message: error?.message }];

  return (
    <>
      <div className="ERROR">
        {setErrors
          ? setErrors.map((e, i) => (
              <p key={i}>
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                {e.message}
              </p>
            ))
          : ""}
      </div>
    </>
  );
}
