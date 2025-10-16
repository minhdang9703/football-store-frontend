const positions = [
  { name: 'Tiền Đạo (Tốc độ)', image: 'https://picsum.photos/seed/striker/400/500', description: 'Bứt tốc & Dứt điểm' },
  { name: 'Tiền Vệ (Kiểm soát)', image: 'https://picsum.photos/seed/midfielder/400/500', description: 'Chuyền bóng & Sáng tạo' },
  { name: 'Hậu Vệ (Chắc chắn)', image: 'https://picsum.photos/seed/defender/400/500', description: 'Tranh chấp & Bền bỉ' },
  { name: 'Thủ Môn (Linh hoạt)', image: 'https://picsum.photos/seed/goalkeeper/400/500', description: 'Phản xạ & Bám dính' },
];

function ShopByPosition() {
  return (
    <section className="py-12 bg-base-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary font-poppins">CHỌN GIÀY THEO VỊ TRÍ</h2>
          <p className="mt-2 text-lg text-text-muted">Tìm kiếm "vũ khí" hoàn hảo cho lối chơi của bạn.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {positions.map(pos => (
            <a href="#" key={pos.name} className="relative overflow-hidden group block">
              <img src={pos.image} alt={pos.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold font-poppins">{pos.name}</h3>
                <p className="text-sm opacity-90">{pos.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByPosition;
