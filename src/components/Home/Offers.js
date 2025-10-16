function Offers() {
  return (
    <div className="py-12 bg-gray-50" id="khuyến-mãi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-poppins">Ưu Đãi & Bộ Sưu Tập Mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden group h-full">
            <img src="https://picsum.photos/seed/offer1/800/600" alt="New Collection" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-2xl font-bold">BST Predator 2025</h3>
              <a href="#" className="text-[#F59521] font-semibold mt-2 inline-block">Xem ngay &rarr;</a>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-8 rounded-lg text-center text-white flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold">GIẢM GIÁ CUỐI MÙA</h3>
            <p className="text-5xl font-bold my-2">LÊN ĐẾN <span className="text-yellow-200">30%</span></p>
            <p className="mb-4">Áp dụng cho các sản phẩm chọn lọc.</p>
            <a href="#" className="bg-white text-[#F59521] font-bold px-6 py-2 rounded-md hover:bg-gray-100 transition self-center">Săn Sale Ngay</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
