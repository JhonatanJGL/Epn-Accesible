import { useEffect, useMemo, useState } from "react";

import { ThemeContext } from "./themeContext";

const THEME_STORAGE_KEY = "epn-accesible-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark"
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((currentTheme) =>
        currentTheme === "light" ? "dark" : "light"
      ),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
