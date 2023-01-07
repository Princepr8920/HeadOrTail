import { createContext, useState } from "react"; 
const ViewContext = createContext({});

export function ViewProvider({ children }) {

  let [view, setView] = useState({ 
    show_Options:false,
    toggle:false,
    edit_operation:{success:false,message:"Information updated successfully"},
    verification:{isVerified : true, message:""},
    isUnlocked:false,
    waiting:false, 
    isLoaded:true,
    error: { inputError: null, otherError: null },
    contacts:[]
  });
 
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export default ViewContext;
