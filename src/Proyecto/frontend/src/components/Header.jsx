import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import ModalWrapper from './modals/ModalWrapper';
import '../pages/Home.css';

const Header = () => {
  const { user, login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(username, password);
      const { token, rol, idUsuario, username: user, email, nombreCompleto } = response.data;
      
      login(
        { idUsuario, username: user, email, rol, nombreCompleto },
        token
      );

      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="home-header">
        <nav className="home-nav">
          <Link to="/" className="logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">FORCA & FITNESS</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/servicios" className="nav-link">Servicios</Link>
            <Link to="/planes" className="nav-link">Planes</Link>
            <Link to="/contacto" className="nav-link">Contacto</Link>
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="btn-login">Iniciar Sesión</button>
            )}
          </div>
        </nav>
      </header>

      {showLoginModal && (
        <ModalWrapper
          title="Iniciar Sesión"
          onClose={() => {
            setShowLoginModal(false);
            setError('');
            setUsername('');
            setPassword('');
          }}
          footer={null}
        >
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ingrese su usuario"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese su contraseña"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
              <button type="submit" disabled={loading} className="btn-primary" style={{flex: 1}}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  setShowLoginModal(false);
                  setError('');
                  setUsername('');
                  setPassword('');
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;

