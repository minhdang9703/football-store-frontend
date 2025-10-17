import { TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function ProductSidebar() {
  return (
    <div className="space-y-4">
      {/* Seller Info */}
      <div className="border p-4">
        <h3 className="font-bold text-secondary mb-2">CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ KICKZONE</h3>
        <div className="flex items-center text-green-600">
          <ShieldCheckIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-semibold">Nhà bán hàng chính hãng</span>
        </div>
      </div>

      {/* Sales Policy */}
      <div className="border p-4">
        <h3 className="font-bold text-secondary mb-4">Chính sách bán hàng</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <TruckIcon className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
            <span>Miễn phí giao hàng cho đơn hàng từ 500.000đ</span>
          </li>
          <li className="flex items-start">
            <ShieldCheckIcon className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
            <span>Cam kết hàng chính hãng 100%</span>
          </li>
          <li className="flex items-start">
            <ArrowPathIcon className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
            <span>Đổi trả trong vòng 10 ngày. <a href="#" className="font-semibold text-accent">Xem chi tiết</a></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductSidebar;
