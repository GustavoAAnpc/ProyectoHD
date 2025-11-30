import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={darkMode ? 'Modo claro' : 'Modo oscuro'}
    >
      {darkMode ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="4" fill="currentColor"/>
          <path d="M10 2V4M10 16V18M4 10H2M18 10H16M5.343 5.343L4.636 4.636M15.364 15.364L14.657 14.657M5.343 14.657L4.636 15.364M15.364 4.636L14.657 5.343" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17.293 13.293C16.9482 13.9248 16.5163 14.5031 16.0122 15.01C15.5081 15.5169 14.9386 15.9466 14.3245 16.2856C13.7104 16.6245 13.0598 16.869 12.3961 17.0121C11.7324 17.1552 11.0539 17.1954 10.3806 17.1316C9.70732 17.0678 9.04746 16.9005 8.42443 16.6358C7.8014 16.371 7.22301 16.0119 6.70997 15.5719C6.19693 15.1319 5.75608 14.6166 5.40314 14.0442C5.05019 13.4717 4.78987 12.8502 4.63143 12.2016C4.47299 11.553 4.41859 10.8853 4.47023 10.2216C4.52187 9.55784 4.67887 8.90697 4.93514 8.29308C5.19142 7.67919 5.54344 7.11041 5.97736 6.60814C6.41127 6.10586 6.92133 5.67674 7.48739 5.33715" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;





