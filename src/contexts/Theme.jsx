
import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  themeMode: "dark",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "dark"
  );

  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("themeMode", "dark");
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  };

  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("themeMode", "light");
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  };


  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
