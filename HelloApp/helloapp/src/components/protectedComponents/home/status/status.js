import React from "react";
import "./status.scss";
import useView from "../../../../hooks/useView";
import Options from "../options/options";
import useTheme from "../../../../hooks/useTheme";

export default function StatusView() {
  let { view } = useView();
  const {
    theme: { darkTheme,theme_profile:{components_background} },
    setTheme,
  } = useTheme();

  console.log(view);
  function handleTheme() {
    setTheme({
      darkTheme: !darkTheme,
      theme_profile: {
        main_background: darkTheme ? "light" : "dark",
        components_background: darkTheme
          ? "components_light_theme"
          : "components_dark_theme",
      },
    });
  }

  let themeIcon = darkTheme ? "fas fa-moon" : "fas fa-sun";
  return (
    <section className={`statusView ${components_background}`}>
      {view?.show_Options ? (
        <Options />
      ) : (
        <div className="default-items">
          <h3>about today</h3>
        </div>
      )}
      <div className="controls">
        <button onClick={handleTheme}>
          {" "}
          <i className={themeIcon}></i>
        </button>
      </div>
    </section>
  );
}
