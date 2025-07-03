import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/responsive.css';
import { AuthProvider } from './context/AuthContext';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/recuperar" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
