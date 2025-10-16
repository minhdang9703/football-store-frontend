const blogPosts = [
  {
    title: 'Cách chọn giày phù hợp với vị trí của bạn',
    image: 'https://picsum.photos/seed/blog1/400/300',
    excerpt: 'Mỗi vị trí trên sân đòi hỏi một loại giày khác nhau để tối ưu hóa hiệu suất. Hãy cùng tìm hiểu...',
  },
  {
    title: 'Review chi tiết Nike Phantom Luna 2',
    image: 'https://picsum.photos/seed/blog2/400/300',
    excerpt: 'Đôi giày được thiết kế dành riêng cho phái nữ có gì đặc biệt? Liệu nó có thực sự tạo ra cuộc cách mạng?',
  },
  {
    title: 'Mẹo tăng tốc và bứt phá trên sân cỏ',
    image: 'https://picsum.photos/seed/blog3/400/300',
    excerpt: 'Tốc độ là vũ khí tối thượng. Khám phá các bài tập và kỹ thuật giúp bạn nhanh hơn đối thủ.',
  },
];

function Blog() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Tin Tức & Mẹo Chơi Bóng</h2>
          <p className="mt-2 text-lg text-gray-600">Cập nhật kiến thức và kỹ năng để trở thành phiên bản tốt nhất của bạn.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 h-14">{post.title}</h3>
                <p className="text-gray-600 mb-4 h-20">{post.excerpt}</p>
                <a href="#" className="font-semibold text-kickzone-orange hover:text-orange-400 transition">Đọc thêm &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
