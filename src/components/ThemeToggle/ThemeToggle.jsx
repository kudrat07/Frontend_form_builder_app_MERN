import React from "react";
import styles from "./theme.module.css";
import useTheme from "../../contexts/Theme";

const ThemeToggle = () => {
  const { themeMode, darkTheme, lightTheme } = useTheme();
  const toggleTheme = () => {
    if (themeMode === "dark") {
      lightTheme();

    } else {
      darkTheme();

    }

  };

  return (
    <div className={styles.container}>
      <p className={`${styles.themeName} ${styles[themeMode]}`}>Light</p>
      <input
        type="checkbox"
        name="checkbox"
        id="toggle"
        onChange={toggleTheme}
        checked={themeMode === "light"}
      />
      <label htmlFor="toggle" className={styles.switch}></label>
      <p className={`${styles.themeName} ${styles[themeMode]}`}>Dark</p>
    </div>
  );
};

export default ThemeToggle;
