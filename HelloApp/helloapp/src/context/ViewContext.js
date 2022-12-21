import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
const ViewContext = createContext({});

export function ViewProvider({ children }) {
  let {auth} = useAuth()
  let [view, setView] = useState({
    my_Profile: auth || {},
    show_Options:false
  });

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export default ViewContext;
