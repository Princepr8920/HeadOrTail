import React from "react";
import "./view.scss";
import useView from "../../../../hooks/usefulHooks/useView"; 
import useTheme from "../../../../hooks/usefulHooks/useTheme";

export default function StatusView() {
  let { view } = useView();
  const {
    theme: { 
      theme_profile: { components_background },
    } 
  } = useTheme();

 
  return (
    <>
      <section
        className={
          view?.show_Options
            ? `statusView shrink ${components_background}`
            : `statusView ${components_background}`
        }
      >
        <div>Live </div>
      </section>
    </>
  );
}
