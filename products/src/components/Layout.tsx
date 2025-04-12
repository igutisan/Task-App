import { Outlet, Link } from 'react-router-dom';
import '../styles/layout.scss';

const Layout = () => {
    return (
        <div className="layout">
            <nav className="layout-nav">
                <div className="nav-container">
                    <div className="nav-content">
                        <div className="nav-brand">
                            <Link to="/" className="brand-link">
                                Mi Tienda
                            </Link>
                        </div>
                        <div className="nav-links">
                            <Link 
                                to="/products" 
                                className="nav-link"
                            >
                                Productos
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">
                <div className="footer-container">
                    <p className="footer-text">
                        © 2024 Mi Tienda. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 