import React, { useState } from 'react';
import './ForgotPassword.css';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      toast.success('Correo enviado. Revisa tu bandeja de entrada.');
      navigate('/reset-password');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Error al enviar el correo';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <div className="forgot-page">
      <h1 className="forgot-header">¿Olvidaste tu contraseña?</h1>

      <div className="forgot-container">
        <label className="forgot-label" htmlFor="email">Correo electrónico</label>
        <input
          className="forgot-input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="forgot-button" onClick={handleSubmit}>
          Enviar instrucciones
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
