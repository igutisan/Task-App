import { useCart } from '../context/CartContext';
import '../styles/cart.scss';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getTotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>¡Agrega algunos productos para comenzar!</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Tu Carrito</h1>
            
            <div className="cart-items">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                            <img 
                                src={item.image} 
                                alt={item.title}
                                onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/150x150?text=Imagen+no+disponible";
                                }}
                            />
                        </div>
                        
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="item-actions">
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                className="remove-button"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                        
                        <div className="item-total">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-summary">
                <div className="summary-row">
                    <span>Total:</span>
                    <span className="total-amount">${getTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-button">
                    Proceder al pago
                </button>
            </div>
        </div>
    );
};

export default Cart; 