import React from 'react';
import Orders from '../components/Orders';
import Header from '../components/Header';

const OrdersPage = () => {
  return (
    <div style={{ backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'Bowlby One, sans-serif' }}>
      <Header />
      <Orders />
    </div>
  );
};

export default OrdersPage;
