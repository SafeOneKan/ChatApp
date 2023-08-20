import { FC, createContext, useContext, useState } from "react";
import { ProviderProps, themeProps } from "../Interfaces/Intreface";

const Context = createContext<themeProps>({} as themeProps);

export const useTheme = () => {
  return useContext(Context);
};

const ThemeContext: FC<ProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const values = {
    isDarkTheme,
    toggleTheme,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ThemeContext;
