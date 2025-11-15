import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.rol) {
      case 'Administrador':
        return '/dashboard/administrador';
      case 'Entrenador':
        return '/dashboard/entrenador';
      case 'Usuario':
        return '/dashboard/usuario';
      default:
        return '/';
    }
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-menu-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
      >
        <div className="user-avatar">
          {user.nombreCompleto?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <span className="user-name">{user.nombreCompleto || user.username}</span>
        <svg 
          className={`menu-arrow ${isOpen ? 'open' : ''}`} 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-info">
              <div className="user-avatar-large">
                {user.nombreCompleto?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="user-name-large">{user.nombreCompleto || user.username}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-role">{user.rol}</div>
              </div>
            </div>
          </div>
          
          <div className="user-menu-divider"></div>
          
          <Link 
            to={getDashboardPath()} 
            className="user-menu-item"
            onClick={() => setIsOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10L9 4L9 8.5L17 8.5L17 11.5L9 11.5L9 16L3 10Z" fill="currentColor"/>
            </svg>
            Mi Dashboard
          </Link>
          
          <Link 
            to={`${getDashboardPath()}?tab=perfil`} 
            className="user-menu-item"
            onClick={() => setIsOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
              <path d="M10 12C5.58172 12 2 14.6863 2 18L18 18C18 14.6863 14.4183 12 10 12Z" fill="currentColor"/>
            </svg>
            Editar Perfil
          </Link>
          
          <Link 
            to={user.rol === 'Usuario' ? `${getDashboardPath()}?tab=clases` : 
                user.rol === 'Entrenador' ? `${getDashboardPath()}?tab=clases` : 
                `${getDashboardPath()}`} 
            className="user-menu-item"
            onClick={() => setIsOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 4L9 11L18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Mis Sesiones
          </Link>
          
          <div className="user-menu-divider"></div>
          
          <button 
            className="user-menu-item logout" 
            onClick={handleLogout}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 18L2 13L7 8M2 13L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

