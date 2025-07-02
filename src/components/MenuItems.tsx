import React from 'react';
import './MenuItems.css';

const MenuItems = () => {
  return (
    <section className="menu-items">
      {/* Item 1 */}
      <div className="menu-card">
        <img src="/images/papas_fritas.png" alt="Papas Fritas" className="menu-image" />
        <div className="menu-callout">
          <h3>Papas Fritas Corte Casero</h3>
          <p>¡Pide la tuya!</p>
        </div>
      </div>

      {/* Item 2 */}
      <div className="menu-card">
        <img src="/images/burger_menu.png" alt="Veggie Mediterránea" className="menu-image" />
        <div className="menu-callout">
          <h3>Veggie Mediterránea</h3>
          <p>¡Pide la tuya!</p>
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
