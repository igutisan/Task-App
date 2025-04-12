import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import '../styles/cartIcon.scss';

const CartIcon = () => {
    const { items } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" className="cart-icon-container">
            <div className="cart-icon-wrapper">
                <BsCart4 className="cart-icon" />
                {itemCount > 0 && (
                    <div className="cart-counter">
                        {itemCount}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default CartIcon; 