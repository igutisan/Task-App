import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../data/productsServices';
import { useCart } from '../context/CartContext';
import { BsCart4, BsCartCheck } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import Loading from '../components/Loading';
import '../styles/products.scss';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [addedProducts, setAddedProducts] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        setAddedProducts(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedProducts(prev => ({ ...prev, [product.id]: false }));
        }, 1500);
    };

    if (loading) {
        return <Loading message="Cargando productos..." />;
    }

    return (
        <div className="products-container">
            <div className="hero-section">
                <h1 className="hero-title">Descubre Nuestros Productos</h1>
                <p className="hero-subtitle">Encuentra lo mejor para ti</p>
            </div>
            
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="product-image"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/300x300?text=Imagen+no+disponible";
                                    }}
                                />
                                <div className="product-overlay">
                                    <Link 
                                        to={`/product/${product.id}`} 
                                        className="view-details-btn"
                                    >
                                        <FaEye className="eye-icon" />
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">
                                    {product.title || "Nombre no disponible"}
                                </h3>
                                <div className="product-price-container">
                                    <p className="product-price">
                                        ${product.price ? product.price.toFixed(2) : "0.00"}
                                    </p>
                                    <button 
                                        className={`add-to-cart-btn ${addedProducts[product.id] ? 'added' : ''}`}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        {addedProducts[product.id] ? (
                                            <>
                                                <BsCartCheck className="cart-icon" />
                                                ¡Agregado!
                                            </>
                                        ) : (
                                            <>
                                                <BsCart4 className="cart-icon" />
                                                Agregar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products">
                        <p>No se encontraron productos</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
