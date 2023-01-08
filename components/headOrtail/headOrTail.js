import React, { useState } from "react";
import "./headOrTail.scss";

export default function HeadAndTail() {
  const [value, setValue] = useState({
    input: "",
    previousInput: "",
    headAndTail: [],
    error: "",
  });

  function handleColumns(val) {
    if (value.previousInput === val && value?.headAndTail.length !== 0) {
      let oldColumns =
        value.headAndTail.length > 1 ? value.headAndTail.slice(0, value.headAndTail.length - 1) : [];
      setValue((other) => ({
        ...other,
        headAndTail: [...oldColumns, [...value.headAndTail[value.headAndTail.length - 1], value.input]],
      }));
    } else if (value.previousInput !== val && value.headAndTail.length === 0) {
      setValue((other) => ({
        ...other,
        headAndTail: [[value.input]],
      }));
    } else {
      setValue((other) => ({
        ...other,
        headAndTail: [...value.headAndTail, [value.input]],
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.input === "H" || value.input === "T") {
      setValue((other) => ({
        ...other,
        input: "Select value",
        previousInput: value.input,
      }));
      handleColumns(value.input);
    } else {
      setValue((other) => ({
        ...other,
        error: "Please select value from dropdown.",
      }));
    }
  }

  return (
    <>
      <section id="headAndTail">
        <h1>HEAD & TAIL</h1>
        <form onSubmit={handleSubmit}>
          <select
            value={value.input}
            onChange={(e) =>
              setValue((other) => ({
                ...other,
                input: e.target.value,
                error: "",
              }))
            }
            name="headOrTail"
          >
            <option defaultValue>Select value</option>
            <option value="H">H</option>
            <option value="T">T</option>
          </select>
          <div id="error">
            <span>{value.error}</span>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <div id="playground">
          {value.headAndTail.map((e, i) => (
            <div key={i} className="col">
              {e.map((e, i) => (
                <span className={e === "H" ? "green" : "blue"} key={i}>
                  {e}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
