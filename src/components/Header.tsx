import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to={user ? "/pedidos" : "/"}>THE BURGER STATION</Link>
      </h1>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li onClick={handleLinkClick}>
            <Link to={user ? "/pedidos" : "/"}>{user ? "Pedidos" : "Inicio"}</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/menu">Menú</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/contacto">Contacto</Link>
          </li>
          {user ? (
            <li
              ref={dropdownRef}
              className="login user-menu"
              onClick={toggleDropdown}
            >
              <span>{user.first_name} {user.last_name}</span>
              <ul className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
                <li onClick={handleLogout}>Cerrar sesión</li>
              </ul>
            </li>
          ) : (
            <li className="login" onClick={handleLinkClick}>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
