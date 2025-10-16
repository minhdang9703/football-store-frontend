const brands = [
  { name: 'Nike', image: 'https://picsum.photos/seed/brand_nike/600/300' },
  { name: 'Adidas', image: 'https://picsum.photos/seed/brand_adidas/600/300' },
  { name: 'Puma', image: 'https://picsum.photos/seed/brand_puma/600/300' },
  { name: 'Mizuno', image: 'https://picsum.photos/seed/brand_mizuno/600/300' },
  { name: 'Joma', image: 'https://picsum.photos/seed/brand_joma/600/300' },
  { name: 'Asics', image: 'https://picsum.photos/seed/brand_asics/600/300' },
];

function ShopByBrand() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary font-poppins">THƯƠNG HIỆU</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <a href="#" key={brand.name} className="group block">
              <div className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={brand.image} 
                  alt={`Giày đá banh ${brand.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-secondary group-hover:text-primary transition">
                GIÀY ĐÁ BANH {brand.name.toUpperCase()} &rsaquo;
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByBrand;
