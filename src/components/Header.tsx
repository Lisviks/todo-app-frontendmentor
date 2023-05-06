import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';

export default function Header() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <div className='logo'>Todo</div>
      <div className='theme-switch' onClick={toggleTheme}></div>
    </header>
  );
}
