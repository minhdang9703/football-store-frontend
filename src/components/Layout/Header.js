import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function Header() {
  const menuItems = ['Trang chủ', 'Sản phẩm', 'Ưu đãi', 'Tin tức', 'Liên hệ'];
  const shoeTypes = ['Sân cỏ tự nhiên (FG)', 'Sân cỏ nhân tạo (AG/TF)', 'Sân Futsal (IC)'];
  const brands = ['Nike', 'Adidas', 'Puma', 'Mizuno'];
  const accessories = ['Bóng đá', 'Vớ', 'Bảo vệ ống đồng', 'Túi & Balo'];

  const DropdownMenu = ({ title, items }) => (
    <div className="relative group">
      <button className="flex items-center text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-primary transition">
        {title}
        <ChevronDownIcon className="h-4 w-4 ml-1" />
      </button>
      <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
        <div className="py-1">
          {items.map(item => (
            <a key={item} href="#" className="block px-4 py-2 text-sm text-secondary hover:bg-gray-100 hover:text-primary">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-bold tracking-wider">
            ⚡<span className="text-primary">KICK</span>ZONE
          </a>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full py-2 px-4 rounded-md text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 rounded-full hover:bg-gray-800 transition">
              <UserIcon className="h-6 w-6" />
            </a>
            <a href="#" className="relative p-2 rounded-full hover:bg-gray-800 transition">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-black text-xs font-bold">3</span>
            </a>
          </div>
        </div>
        <nav className="hidden md:flex items-center justify-center space-x-8 h-12 border-t border-gray-700">
          <DropdownMenu title="Giày bóng đá" items={shoeTypes} />
          <DropdownMenu title="Thương hiệu" items={brands} />
          <DropdownMenu title="Phụ kiện" items={accessories} />
          <a href="#" className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-primary transition">
            Tin tức
          </a>
          <a href="#" className="relative text-sm font-semibold uppercase tracking-wider text-primary transition animate-pulse">
            Hot Sales
            <span className="absolute -top-1 -right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cta-hover opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cta-hover"></span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
