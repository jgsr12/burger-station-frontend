import React from 'react';
import './YellowBanner.css';

const YellowBanner = () => {
  return (
    <section className="yellow-banner">
      <div className="banner-content">
        <div className="left">
          <h2>UNA MORDIDA<br />Y NO HAY<br />VUELTA ATRÁS.</h2>
        </div>
        <div className="right">
          <p>Hamburguesas artesanales, hechas con amor<br />y puro flow callejero.</p>
          <button>¡PIDE LA TUYA!</button>
        </div>
      </div>
    </section>
  );
};

export default YellowBanner;
