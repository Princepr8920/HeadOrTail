import { useState } from "react";
import { createContext } from "react";
const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    darkTheme: false,
    theme_profile: {
      main_background: "light",
      components_background: "components_light_theme",
    },
  });
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
