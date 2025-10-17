function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400" id="liên-hệ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">⚡KICKZONE</h3>
          <p>Bứt tốc cùng đam mê sân cỏ.</p>
          {/* Social Icons can be added here */}
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Menu</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-[#F59521]">Sản phẩm</a></li>
            <li className="mb-2"><a href="#" className="hover:text-[#F59521]">Chính sách đổi trả</a></li>
            <li className="mb-2"><a href="#" className="hover:text-[#F59521]">Hỗ trợ khách hàng</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
          <p>Hotline: 0123.456.789</p>
          <p>Email: support@kickzone.com</p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Đăng ký nhận tin</h3>
          <form className="flex">
            <input type="email" placeholder="Email của bạn" className="bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none w-full" />
            <button className="bg-[#F59521] text-black font-bold px-4 rounded-r-md">&rarr;</button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-sm">&copy; 2025 KICKZONE. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
