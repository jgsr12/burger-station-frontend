import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await login(form);
      toast.success('Inicio de sesión exitoso');
      navigate('/pedidos');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Ocurrió un error';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="nav-login-logo">The Burger Station</Link>
      <h1 className="login-header">Bienvenido de nuevo</h1>

      <div className="login-container">
        <h2 className="login-title">inicia sesión para seguir devorando sin límites</h2>

        <label className="login-label" htmlFor="email">Correo electrónico</label>
        <input
          className="login-input"
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label className="login-label" htmlFor="password">Contraseña</label>
        <input
          className="login-input"
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="login-button" onClick={handleLogin}>Entrar</button>

        <p className="login-footer">
          ¿Olvidaste tu contraseña?{' '}
          <Link to="/recuperar" className="login-footer-link">
            recupérala aquí
          </Link>
        </p>

        <p className="login-footer">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="login-footer-link">únete a la estación</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
