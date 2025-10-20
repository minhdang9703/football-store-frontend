import { useCart } from '../context/CartContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">      
      <main className="flex-grow bg-base-light py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-secondary font-poppins mb-8">Giỏ Hàng Của Bạn</h1>
          {cartItems.length === 0 ? (
            <div className="text-center bg-white p-8">
              <p className="text-lg text-text-muted mb-4">Giỏ hàng của bạn đang trống.</p>
              <Link to="/" className="bg-primary text-white font-bold py-2 px-6 hover:bg-cta-hover transition">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-4">
                {cartItems.map(item => (
                  <div key={item.cartItemId} className="flex items-center gap-4 border-b py-4">
                    <img src={item.image} className="w-24 h-24 object-contain" />
                    {/* {item.color && item.color.name ? (  
                      <p className="text-sm text-text-muted">
                        Màu: {item.color?.name || 'Không rõ'}, Size: {item.size || 'Không rõ'}
                      </p>
                    ) : (
                      <p className="text-sm text-text-muted">
                        Size: {item.size || 'Không có'}
                      </p>
                    )} */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary">{item.name}</h3>
                      <p className="text-sm text-text-muted">Màu: {item.color?.name || 'Không rõ'}, Size: {item.size || 'Không rõ'}</p>
                      <p className="font-bold text-cta-hover">{item.price.toLocaleString()}₫</p>
                    </div>
                    <div className="flex items-center border">
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="w-8 h-8 font-bold">-</button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="w-8 h-8 font-bold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-text-muted hover:text-cta-hover">Xóa</button>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1 bg-white p-6 h-fit">
                <h2 className="text-xl font-bold mb-4">Tổng Cộng</h2>
                <div className="flex justify-between mb-6">
                  <span>Tạm tính:</span>
                  <span className="font-bold">{total.toLocaleString()}₫</span>
                </div>
                {/* Proceed to checkout page */}
                <Link to="/checkout" className="block">
                  <button className="w-full bg-cta-hover text-white font-bold py-3 uppercase">
                    Tiến hành thanh toán
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>      
    </div>
  );
}

export default CartPage;
