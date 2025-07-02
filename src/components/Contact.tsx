import React from 'react';
import './Contact.css';
import Header from '../components/Header';

const Contact = () => {
  return (
    <>
      <div className="contact-page">
        <h1 className="contact-title">Contáctanos</h1>
        <div className="contact-container">
          <div className="contact-info">
            <h2>The Burger Station</h2>
            <p><strong>Dirección:</strong> Calle 123 #45-67, Neiva, Huila</p>
            <p><strong>Teléfono:</strong> +57 320 432 2345</p>
            <p><strong>Email:</strong> contacto@burgerstation.com</p>
            <p><strong>Horario de atención:</strong> Lunes a Domingo de 11:00 AM a 10:00 PM</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
