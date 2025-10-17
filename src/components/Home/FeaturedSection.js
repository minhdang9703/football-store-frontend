import { TagIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const features = [
    {
      name: 'Giá Tốt Nhất',
      description: 'Cam kết giá cạnh tranh nhất thị trường.',
      icon: TagIcon,
    },
    {
      name: 'Hàng Chính Hãng',
      description: '100% sản phẩm chính hãng, bảo hành đầy đủ.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Giao Hàng Nhanh',
      description: 'Giao hàng hỏa tốc trong nội thành TP.HCM.',
      icon: TruckIcon,
    },
];

const categories = [
  { name: 'Sân Cỏ Nhân Tạo', href: '#', imageSrc: '/assets/images/categories/turf.jpg' },
  { name: 'Sân Cỏ Tự Nhiên', href: '#', imageSrc: '/assets/images/categories/firm-ground.jpg' },
  { name: 'Phụ Kiện', href: '#', imageSrc: '/assets/images/categories/accessories.jpg' },
];

function FeaturedSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b pb-8">
            {features.map((feature) => (
            <div key={feature.name} className="flex items-start">
                <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-orange-500" aria-hidden="true" />
                </div>
                <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900">{feature.name}</p>
                    <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                </div>
            </div>
            ))}
        </div>

        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Danh Mục Nổi Bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
            <a key={category.name} href={category.href} className="relative group">
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img src={category.imageSrc} alt={category.name} className="w-full h-full object-cover object-center group-hover:opacity-80 transition" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
            </a>
            ))}
        </div>
    </div>
  );
}

export default FeaturedSection;
