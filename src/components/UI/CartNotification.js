import { useCart } from '../../context/CartContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

function CartNotification() {
  const { showNotification } = useCart();

  return (
    <div className={`fixed top-36 right-5 z-50 transition-transform duration-300 ${showNotification ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="bg-white p-4 shadow-lg flex items-center">
        <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
        <p className="font-semibold text-secondary">Đã thêm vào giỏ hàng!</p>
      </div>
    </div>
  );
}

export default CartNotification;
