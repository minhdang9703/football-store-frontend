function QuickSearch() {
  const keywords = ['Nike Mercurial', 'Adidas Predator', 'Giày sân cỏ nhân tạo', 'Sale 50%'];

  return (
    <div className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap">
        <h3 className="text-lg font-semibold text-secondary mr-4">Bạn đang tìm?</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {keywords.map(keyword => (
            <a key={keyword} href="#" className="px-3 py-1 bg-gray-100 text-sm text-text-muted rounded-full hover:bg-primary hover:text-white transition">
              {keyword}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickSearch;
