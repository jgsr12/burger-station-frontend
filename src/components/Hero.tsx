import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h2>
        DONDE CADA <br />
        MORDISCO CUENTA <br />
        UNA HISTORIA
      </h2>

      {/* Vectores */}
      <div className="vector-left" />
      <div className="vector-right" />

      {/* Hamburguesas (centrales y laterales) */}
      <img src="/images/burger_1.png" className="burger burger-left" alt="Burger Left" />
      <img src="/images/burger_2.png" className="burger burger-center" alt="Burger Center" />
      <img src="/images/burger_3.png" className="burger burger-right" alt="Burger Right" />
    </section>
  );
};

export default Hero;
