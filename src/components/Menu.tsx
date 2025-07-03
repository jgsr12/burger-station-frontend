import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

interface Hamburger {
    id: number;
    name: string;
    description: string;
    price: string;
}

interface Side {
    id: number;
    name: string;
    price: string;
}

interface Drink {
    id: number;
    name: string;
    type: string;
    price: string;
}

interface Ingredient {
    id: number;
    name: string;
    price: string;
}

interface Sauce {
    id: number;
    name: string;
    price: string;
}

type MenuItem = {
    id: number;
    name: string;
    price: number;
    type: 'hamburger' | 'side' | 'drink';
};

type CartItem = MenuItem & {
    ingredientIds?: number[];
    sauceIds?: number[];
};

const burgerImageMap = {
    'La Montañesa': '/images/burgers/monta.jpg',
    'El Ranchero': '/images/burgers/ranche.jpeg',
    'Veggie Mediterránea': '/images/burgers/veggie.avif',
    'Doble Búfalo': '/images/burgers/buda.jpg',
    'Mar y Tierra': '/images/burgers/marytie.jpg',
};

const sideImageMap = {
    'Papas Fritas Corte Casero': '/images/sides/papafritas.jpg',
    'Papas en Cascos con Piel': '/images/sides/conpiel.jpg',
    'Batatas Fritas': '/images/sides/batatas.webp',
};

const drinkImageMap = {
    'Limonada Natural': '/images/drinks/limonada.jpg',
    'Gaseosa Cola': '/images/drinks/cocacola.webp',
    'Gaseosa Naranja': '/images/drinks/naranja.png',
    'Gaseosa Lima-Limón': '/images/drinks/limalimon.jpg',
    'Té Helado Durazno': '/images/drinks/tedura.webp',
    'Té Helado Limón': '/images/drinks/telimon.avif',
    'Agua Embotellada': '/images/drinks/agua.webp',
    'Cerveza Artesanal': '/images/drinks/cerveza.jpg',
};

const Menu = () => {
    const [hamburgers, setHamburgers] = useState<Hamburger[]>([]);
    const [sides, setSides] = useState<Side[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [sauces, setSauces] = useState<Sauce[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeExtrasIndex, setActiveExtrasIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const [hamburgersRes, sidesRes, drinksRes, ingredientsRes, saucesRes] = await Promise.all([
                    axiosInstance.get('/menu/hamburgers'),
                    axiosInstance.get('/menu/sides'),
                    axiosInstance.get('/menu/drinks'),
                    axiosInstance.get('/menu/ingredients'),
                    axiosInstance.get('/menu/sauces'),
                ]);
                setHamburgers(hamburgersRes.data);
                setSides(sidesRes.data);
                setDrinks(drinksRes.data);
                setIngredients(ingredientsRes.data);
                setSauces(saucesRes.data);
            } catch (error) {
                console.error('Error al cargar el menú', error);
            }
        };
        fetchMenu();
    }, []);

    const addToCart = (item: MenuItem) => {
        const isBurger = item.type === 'hamburger';
        const newItem: CartItem = {
            ...item,
            ingredientIds: isBurger ? [] : undefined,
            sauceIds: isBurger ? [] : undefined,
        };
        setCart(prev => [...prev, newItem]);
    };

    const removeFromCart = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
        if (activeExtrasIndex === index) setActiveExtrasIndex(null);
    };

    const handleIngredientToggle = (index: number, id: number) => {
        setCart(prev => {
            const updated = [...prev];
            const item = { ...updated[index] };
            const current = [...(item.ingredientIds || [])];

            if (current.includes(id)) {
                item.ingredientIds = current.filter(i => i !== id);
            } else if (current.length < 3) {
                current.push(id);
                item.ingredientIds = current;
            }

            updated[index] = item;
            return updated;
        });
    };

    const handleSauceToggle = (index: number, id: number) => {
        setCart(prev => {
            const updated = [...prev];
            const item = { ...updated[index] };
            const current = [...(item.sauceIds || [])];

            if (current.includes(id)) {
                item.sauceIds = current.filter(i => i !== id);
            } else if (current.length < 2) {
                current.push(id);
                item.sauceIds = current;
            }

            updated[index] = item;
            return updated;
        });
    };

    const getExtrasTotal = (item: CartItem) => {
        let extra = 0;

        if (item.ingredientIds?.length) {
            extra += item.ingredientIds.reduce((sum, id) => {
                const ing = ingredients.find(i => i.id === id);
                return sum + (ing ? parseFloat(ing.price) : 0);
            }, 0);
        }

        if (item.sauceIds?.length) {
            extra += item.sauceIds.reduce((sum, id) => {
                const sauce = sauces.find(s => s.id === id);
                return sum + (sauce ? parseFloat(sauce.price) : 0);
            }, 0);
        }

        return extra;
    };

    const total = cart.reduce((sum, item) => {
        return sum + item.price + getExtrasTotal(item);
    }, 0);

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get('/auth/me', { withCredentials: true });
            return !!res.data?.email;
        } catch {
            return false;
        }
    };

    const handleConfirmOrder = async () => {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            toast.warning('Debes iniciar sesión para hacer un pedido');
            navigate('/login');
            return;
        }

        try {
            const hamburgersInCart = cart.filter(item => item.type === 'hamburger');
            const side = cart.find(i => i.type === 'side');
            const drink = cart.find(i => i.type === 'drink');

            const formattedItems = hamburgersInCart.map(item => {
                const base: {
                    hamburgerId: number;
                    ingredientIds: number[];
                    sauceIds: number[];
                    sideId?: number;
                    drinkId?: number;
                } = {
                    hamburgerId: item.id,
                    ingredientIds: item.ingredientIds || [],
                    sauceIds: item.sauceIds || [],
                };

                if (side) base.sideId = side.id;
                if (drink) base.drinkId = drink.id;

                return base;
            });

            await axiosInstance.post('/orders', { items: formattedItems });
            toast.success('Pedido realizado con éxito');
            setCart([]);
            setIsCartOpen(false);
        } catch (error) {
            console.error('Error al confirmar pedido', error);
            toast.error('Error al confirmar pedido');
        }
    };

    return (
        <div className="menu-page">
            <main className="menu-content">
                {([
                    { title: 'Hamburguesas', items: hamburgers, imgMap: burgerImageMap, type: 'hamburger' as const },
                    { title: 'Acompañamientos', items: sides, imgMap: sideImageMap, type: 'side' as const },
                    { title: 'Bebidas', items: drinks, imgMap: drinkImageMap, type: 'drink' as const }
                ]).map(({ title, items, imgMap, type }) => {
                    const typedImgMap: Record<string, string> = imgMap;
                    return (
                        <section key={title}>
                            <h2>{title}</h2>
                            <div className="menu-grid">
                                {items.map((item: any) => (
                                    <div className="menu-card" key={item.id}>
                                        <img src={typedImgMap[item.name] || '/images/default.jpg'} alt={item.name} className="menu-image" />
                                        <h3>{item.name}</h3>
                                        {item.description && <p>{item.description}</p>}
                                        <p className="price">${parseFloat(item.price).toFixed(2)}</p>
                                        <button className="add-to-cart-btn" onClick={() =>
                                            addToCart({ id: item.id, name: item.name, price: parseFloat(item.price), type })}>
                                            Añadir al carrito
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>

            <button className="floating-cart-button" onClick={() => setIsCartOpen(true)}>
                🛒 Ver Carrito ({cart.length})
            </button>

            {isCartOpen && (
                <div className="cart-modal">
                    <div className="cart-modal-content">
                        <button className="close-button" onClick={() => setIsCartOpen(false)}>✖</button>
                        <h2>🛍 Tu Carrito</h2>
                        {cart.length === 0 ? (
                            <p>Tu carrito está vacío.</p>
                        ) : (
                            <>
                                <ul className="cart-items">
                                    {cart.map((item, idx) => (
                                        <li key={idx} className="cart-item">
                                            <strong>{item.name}</strong> - ${item.price.toFixed(2)}{' '}
                                            {getExtrasTotal(item) > 0 && (
                                                <span> + Extras: ${getExtrasTotal(item).toFixed(2)}</span>
                                            )}
                                            <button onClick={() => removeFromCart(idx)} className="remove-btn">❌</button>

                                            {item.type === 'hamburger' && (
                                                <>
                                                    <button
                                                        className="toggle-extras-btn"
                                                        onClick={() => setActiveExtrasIndex(activeExtrasIndex === idx ? null : idx)}
                                                    >
                                                        {activeExtrasIndex === idx ? 'Ocultar Adicionales' : 'Personalizar'}
                                                    </button>

                                                    {activeExtrasIndex === idx && (
                                                        <div className="extras-section">
                                                            <div>
                                                                <label>Adicionales (máx. 3):</label>
                                                                <div className="extras-list">
                                                                    {ingredients.map(ing => (
                                                                        <label key={ing.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!!item.ingredientIds?.includes(ing.id)}
                                                                                onChange={() => handleIngredientToggle(idx, ing.id)}
                                                                                disabled={
                                                                                    !item.ingredientIds?.includes(ing.id) &&
                                                                                    (item.ingredientIds?.length ?? 0) >= 3
                                                                                }
                                                                            />
                                                                            <span>{ing.name} (${parseFloat(ing.price).toFixed(2)})</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label>Salsas (máx. 2):</label>
                                                                <div className="extras-list">
                                                                    {sauces.map(s => (
                                                                        <label key={s.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!!item.sauceIds?.includes(s.id)}
                                                                                onChange={() => handleSauceToggle(idx, s.id)}
                                                                                disabled={
                                                                                    !item.sauceIds?.includes(s.id) &&
                                                                                    (item.sauceIds?.length ?? 0) >= 2
                                                                                }
                                                                            />
                                                                            <span>{s.name} {parseFloat(s.price) > 0 ? `($${parseFloat(s.price).toFixed(2)})` : '(Gratis)'}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p className="cart-total">Total: ${total.toFixed(2)}</p>
                                <button className="confirm-order-btn" onClick={handleConfirmOrder}>Confirmar Pedido</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
