import React, { useState } from 'react';
import './ResetPassword.css';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await axiosInstance.post('/auth/reset-password', {
        token: form.token,
        newPassword: form.newPassword,
      });
      toast.success('Contraseña restablecida correctamente');
      navigate('/login');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Error al restablecer contraseña';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <div className="reset-password-page">
      <h1 className="reset-header">Restablecer contraseña</h1>

      <div className="reset-container">
        <label className="reset-label" htmlFor="token">Token de recuperación</label>
        <input
          className="reset-input"
          type="text"
          id="token"
          name="token"
          value={form.token}
          onChange={handleChange}
        />

        <label className="reset-label" htmlFor="newPassword">Nueva contraseña</label>
        <input
          className="reset-input"
          type="password"
          id="newPassword"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />

        <label className="reset-label" htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          className="reset-input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button className="reset-button" onClick={handleSubmit}>Restablecer contraseña</button>
      </div>
    </div>
  );
};

export default ResetPassword;
