import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartNotification from './components/UI/CartNotification';import MainLayout from './components/Layout/Layout';
function App() {
//   return (
//     <CartProvider>
//       <Router>     
//         <CartNotification />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products/:id" element={<ProductDetailPage />} />
//           <Route path="/cart" element={<CartPage />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }
 return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
