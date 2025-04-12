import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getProductById } from '../data/productsServices';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import '../styles/productDetail.scss';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('ID de producto no válido');
                setLoading(false);
                return;
            }

            try {
                const data = await getProductById(parseInt(id));
                setProduct(data);
                setError(null);
            } catch (error) {
                setError('Error al cargar el producto');
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (addedToCart) {
            const timer = setTimeout(() => {
                setAddedToCart(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [addedToCart]);

    if (loading) {
        return <Loading message="Cargando detalles del producto..." />;
    }

    if (error || !product) {
        return (
            <div className="error-container">
                <p className="error-message">{error || 'Producto no encontrado'}</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
        setAddedToCart(true);
    };

    return (
        <div className="product-detail-container">
            {addedToCart && (
                <div className="add-to-cart-notification">
                    ¡Producto agregado al carrito!
                </div>
            )}
            <div className="product-detail-card">
                <div className="product-image-section">
                    <img 
                        src={product.image} 
                        alt={product.title}
                        onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/600x600?text=Imagen+no+disponible";
                        }}
                    />
                </div>
                <div className="product-info-section">
                    <span className="product-category">{product.category}</span>
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <div className="action-buttons">
                        <button 
                            className={`add-to-cart ${addedToCart ? 'added' : ''}`} 
                            onClick={handleAddToCart}
                        >
                            <span className="cart-icon">🛒</span>
                            {addedToCart ? 'Agregado' : 'Agregar al Carrito'}
                        </button>
                        <button className="buy-now">Comprar Ahora</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 