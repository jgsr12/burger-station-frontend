import React, { useEffect, useState } from 'react';
import './Orders.css';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'sonner';

interface Ingredient {
  id: number;
  name: string;
  price: string | number;
}

interface Sauce {
  id: number;
  name: string;
  price: string | number;
}

interface OrderItem {
  id: number;
  hamburger?: {
    name: string;
    description: string;
    price: string;
  };
  side?: {
    name: string;
    price: string;
  };
  drink?: {
    name: string;
    type: string;
    price: string;
  };
  ingredients: Ingredient[];
  sauces: Sauce[];
  price: string;
}

interface Order {
  id: number;
  createdAt: string;
  total: string;
  status: string;
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/orders');
        setOrders(res.data);
      } catch (error: any) {
        toast.error('Error al cargar los pedidos');
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (id: number) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="orders-page">
      <h1 className="orders-title">Tus Pedidos</h1>
      {orders.length === 0 ? (
        <p className="orders-empty">No has realizado pedidos aún.</p>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="order-row">
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>${Number(order.total).toFixed(2)}</td>
                    <td>
                      <button className="toggle-details" onClick={() => toggleOrder(order.id)}>
                        {expandedOrderId === order.id ? 'Ocultar' : 'Ver detalles'}
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && (
                    <tr className="order-details">
                      <td colSpan={5}>
                        <div>
                          <h4>Hamburguesas</h4>
                          <ul>
                            {order.items?.filter((item) => item.hamburger).map((item, index) => (
                              <li key={index}>
                                <strong>{item.hamburger!.name}</strong> - {item.hamburger!.description}<br />
                                Precio: ${Number(item.hamburger!.price).toFixed(2)}
                                {item.ingredients.length > 0 && (
                                  <>
                                    <br />Adicionales:
                                    <ul>
                                      {item.ingredients.map((ing) => (
                                        <li key={ing.id}>
                                          {ing.name} (${Number(ing.price).toFixed(2)})
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                                {item.sauces.length > 0 && (
                                  <>
                                    <br />Salsas:
                                    <ul>
                                      {item.sauces.map((sauce) => (
                                        <li key={sauce.id}>
                                          {sauce.name} (${Number(sauce.price).toFixed(2)})
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>

                          <h4>Acompañamientos</h4>
                          <ul>
                            {order.items?.filter((item) => item.side).map((item, index) => (
                              <li key={index}>
                                {item.side!.name} - ${Number(item.side!.price).toFixed(2)}
                              </li>
                            ))}
                          </ul>

                          <h4>Bebidas</h4>
                          <ul>
                            {order.items?.filter((item) => item.drink).map((item, index) => (
                              <li key={index}>
                                {item.drink!.name} - ${Number(item.drink!.price).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
