const categories = [
  { name: 'Sân Cỏ Tự Nhiên', href: '#' },
  { name: 'Sân Cỏ Nhân Tạo', href: '#' },
  { name: 'Giày Futsal', href: '#' },
  { name: 'Phụ Kiện', href: '#' },
];

function FeaturedCategories() {
  return (
    <div className="bg-white py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="p-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary transition">
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCategories;
