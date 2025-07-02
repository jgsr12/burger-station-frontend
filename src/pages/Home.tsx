import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import YellowBanner from '../components/YellowBanner';
import MenuItems from '../components/MenuItems';
import Testimonial from '../components/Testimonial';
import FullWidthImage from '../components/FullWidthImage';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/pedidos');
    }
  }, [user, navigate]);

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'Bowlby One, sans-serif' }}>
      <Header />
      <Hero />
      <YellowBanner />
      <MenuItems />
      <Testimonial />
      <FullWidthImage />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
