import { createContext, useEffect, useState } from 'react';

interface ThemePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: ThemePropsInterface) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const bodyClassList = document.body.classList;
    if (isDark) {
      bodyClassList.remove('light');
      bodyClassList.add('dark');
    } else {
      bodyClassList.remove('dark');
      bodyClassList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('test');
    setIsDark(!isDark);
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
