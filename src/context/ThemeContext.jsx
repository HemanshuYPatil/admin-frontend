import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";

import { useEffect } from "react";
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("themeMode")); 
  window.localStorage.setItem("themeMode", theme); 

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
    window.localStorage.setItem("themeMode", theme);
  };

  useEffect(() => {
    if (!window.localStorage.getItem("themeMode")) {
      // If theme is not set in local storage, set the default theme
      window.localStorage.setItem("themeMode", DARK_THEME);
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
