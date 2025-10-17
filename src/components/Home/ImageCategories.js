const categories = [
  { name: 'GIÀY ĐÁ BANH TRẺ EM', image: 'https://picsum.photos/seed/cat1/600/400' },
  { name: 'ÁO BÓNG ĐÁ CHÍNH HÃNG', image: 'https://picsum.photos/seed/cat2/600/400' },
  { name: 'QUẢ BÓNG ĐÁ', image: 'https://picsum.photos/seed/cat3/600/400' },
  { name: 'VỚ BÓNG ĐÁ', image: 'https://picsum.photos/seed/cat4/600/400' },
  { name: 'BẢO VỆ ỐNG ĐỒNG', image: 'https://picsum.photos/seed/cat5/600/400' },
  { name: 'PHỤ KIỆN RA SÂN', image: 'https://picsum.photos/seed/cat6/600/400' },
];

function ImageCategories() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <a href="#" key={category.name} className="group block text-center">
              <div className="overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-secondary group-hover:text-primary transition">
                {category.name} &rsaquo;
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImageCategories;
