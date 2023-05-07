import { useEffect, useState } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('FEM-todo-theme');
    theme && setIsDark(JSON.parse(theme));
  }, []);

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
    setIsDark(!isDark);
    localStorage.setItem('FEM-todo-theme', `${!isDark}`);
  };

  return (
    <header>
      <div className='logo'>Todo</div>
      <div className='theme-switch' onClick={toggleTheme}></div>
    </header>
  );
}
