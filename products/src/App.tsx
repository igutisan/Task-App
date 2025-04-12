import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Products from './pages/products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CartIcon from './components/CartIcon';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <CartIcon />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
