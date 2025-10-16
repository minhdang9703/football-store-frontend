function PartnerBrands() {
  const brands = [
    { name: 'Nike', logo: 'https://tse1.mm.bing.net/th/id/OIP.OFAJjiEH5qsHo77r9dY64gHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Adidas', logo: 'https://th.bing.com/th/id/OIP.aw4ynosen6elgMpjUjaUBwHaEK?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Puma', logo: 'https://th.bing.com/th/id/R.b2ed9be05fd8fce1d158b1cb742c6d95?rik=Nym9nX5V5UJU%2fQ&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f06%2fpuma-logo-1.jpg&ehk=2g4AZPfKggqysOQWc5kUPpMbDah%2f57X7KHdcGeibZCY%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Mizuno', logo: 'https://th.bing.com/th/id/R.d1e1eeaffc41fa6fa17b1233ba8a9626?rik=oQWM4heG7hqZ4A&pid=ImgRaw&r=0' },
    { name: 'Umbro', logo: 'https://vectorseek.com/wp-content/uploads/2021/01/Umbro-Logo-Vector-2048x2048.jpg' },
  ];

  return (
    <div className="bg-white py-12" id="thương-hiệu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-poppins">Thương Hiệu Hàng Đầu</h2>
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

export default PartnerBrands;
