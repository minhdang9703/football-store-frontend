const posts = [
  { title: 'Top 5 đôi giày đáng mua nhất 2024', image: 'https://picsum.photos/seed/blog1/400/300', category: 'Đánh giá' },
  { title: 'Cách bảo quản giày sau mỗi trận đấu', image: 'https://picsum.photos/seed/blog2/400/300', category: 'Mẹo hay' },
  { title: 'Phân biệt các loại đinh giày FG, AG, TF', image: 'https://picsum.photos/seed/blog3/400/300', category: 'Kiến thức' },
];

function BlogSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary font-poppins">TIN TỨC & MẸO HAY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <a href="#" key={post.title} className="group block">
              <div className="overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-primary">{post.category}</p>
                <h3 className="mt-1 text-lg font-bold text-secondary group-hover:text-primary transition">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
