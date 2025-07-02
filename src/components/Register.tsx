import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axiosInstance.post('/auth/register', form);
      toast.success('¡Registro exitoso!');
      navigate('/login');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Ocurrió un error';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className="register-page">
      <Link to="/" className="nav-register-logo">The Burger Station</Link>
      <h1 className="register-main-title">Únete a la estación del sabor</h1>

      <div className="register-container">
        <h2 className="register-subtitle">inicia sesión para seguir devorando sin límites</h2>

        <label className="register-label" htmlFor="first_name">Nombre</label>
        <input className="register-input" type="text" id="first_name" name="first_name" onChange={handleChange} />

        <label className="register-label" htmlFor="last_name">Apellido</label>
        <input className="register-input" type="text" id="last_name" name="last_name" onChange={handleChange} />

        <label className="register-label" htmlFor="email">Correo electrónico</label>
        <input className="register-input" type="email" id="email" name="email" onChange={handleChange} />

        <label className="register-label" htmlFor="password">Contraseña</label>
        <input className="register-input" type="password" id="password" name="password" onChange={handleChange} />

        <label className="register-label" htmlFor="phone">Teléfono</label>
        <input className="register-input" type="tel" id="phone" name="phone" onChange={handleChange} />

        <button className="register-button" onClick={handleRegister}>Únete</button>

        <p className="register-footer">
          ¿Ya eres parte del club? <Link to="/login" className="register-footer-link">inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
