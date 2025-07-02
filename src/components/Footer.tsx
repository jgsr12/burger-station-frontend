import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-brand">the burger station</h2>

      <div className="footer-contact">
        <p>Contáctanos</p>
        <div className="footer-input-container">
          <input type="text" placeholder="Escribe tu mensaje" />
          <button type="button">Enviar</button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; Copyright The Burger Station</span>
        <span className="privacy">Políticas Privadas</span>
      </div>
    </footer>
  );
};

export default Footer;
