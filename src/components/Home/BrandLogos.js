function BrandLogos() {
  const brands = [
    { name: 'Nike', logo: 'https://tse3.mm.bing.net/th/id/OIP.3-sgKulcQgN-uqO3aicjuwHaFj?cb=12&w=2048&h=1536&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Adidas', logo: 'https://loodibee.com/wp-content/uploads/Adidas-Logo.png' },
    { name: 'Puma', logo: 'https://th.bing.com/th/id/R.b37bf719a0579692841d1b15ba99199e?rik=KJqlm%2b%2fJPs7QGQ&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f06%2fpuma-logo-1-1.jpg&ehk=nQJkwEjVBfLmoRK2H6jFLTeoo9R%2fqJnlSjHV69f5E%2fE%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Mizuno', logo: 'https://th.bing.com/th/id/R.b873a999c79ff7051696f94e8377d3f0?rik=IURU2KipTacCqg&pid=ImgRaw&r=0' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-secondary font-poppins mb-8">THƯƠNG HIỆU HÀNG ĐẦU</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {brands.map((brand) => (
            <img
              key={brand.name}
              className="h-10 md:h-12 object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300"
              src={brand.logo}
              alt={brand.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandLogos;
