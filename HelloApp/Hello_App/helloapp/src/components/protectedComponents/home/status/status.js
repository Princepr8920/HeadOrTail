import React from "react"; 
import "./status.scss";
import useView from "../../../../hooks/usefulHooks/useView"; 
import Options from "../options/options";
import useTheme from "../../../../hooks/usefulHooks/useTheme";


export default function ProfileView() {  
  const {theme:{theme_profile:{components_background}}} = useTheme()
  let {view} = useView()
 
  
 
  return (
    <section className={view?.show_Options ? `profileView extend ${components_background}` : `profileView ${components_background}`}>
       { view?.show_Options ? <Options/> : <div>
        default items
       </div> }  
    </section>
  );
}
