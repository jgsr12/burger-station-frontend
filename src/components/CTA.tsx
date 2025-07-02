import React from 'react';
import './CTA.css';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta">
      <h2 className="cta-title">HAGA SU PEDIDO</h2>
      <div className="cta-buttons">
        <Link to="/login" className="cta-btn">Entrar</Link>
        <Link to="/registro" className="cta-btn">Únete</Link>
      </div>
    </section>
  );
};

export default CTA;
