import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {!isHome && (
                    <button onClick={handleBack} className="back-button">
                        ←
                    </button>
                )}
                
                <Link to="/" className="brand">
                    <span className="brand-icon">🛍️</span>
                    <h1 className="brand-name">Mi Tienda</h1>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar; 