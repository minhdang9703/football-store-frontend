import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
// import ProductListPage from './pages/ProductListPage';
import CartNotification from './components/UI/CartNotification';
import MainLayout from './components/Layout/Layout';
import CheckoutPage from './pages/CheckoutPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CartNotification />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              {/* <Route path="/productlist" element={<ProductListPage />} /> */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              {/* Category listing (header dropdown uses /category?type=...) */}
              <Route path="/category" element={<ProductCategoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
