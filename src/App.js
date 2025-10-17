import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import CartNotification from './components/UI/CartNotification';

function App() {
  return (
    <CartProvider>
      <Router>     
        <CartNotification />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
