function HeroBanner() {
  return (
    <div className="relative h-[60vh] min-h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase font-poppins tracking-wider">
          Khơi Dậy Đam Mê Sân Cỏ
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-200 font-inter">
          Khám phá bộ sưu tập giày bóng đá mới nhất — hiệu năng tối đa, thiết kế đỉnh cao.
        </p>
        <a
          href="#sản-phẩm"
          className="mt-8 px-8 py-3 bg-primary text-black font-bold uppercase rounded-md hover:bg-cta-hover hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Khám phá bộ sưu tập
        </a>
      </div>
    </div>
  );
}

export default HeroBanner;
