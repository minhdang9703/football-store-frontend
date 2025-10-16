function Newsletter() {
  return (
    <div className="bg-orange-500 rounded-xl shadow-md p-8 text-center my-8">
      <h2 className="text-2xl font-bold text-white mb-2">Đăng ký nhận tin</h2>
      <p className="text-orange-100 mb-4">Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi đặc biệt.</p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-white text-orange-500 font-semibold px-6 py-2 rounded-lg hover:bg-orange-100 transition"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
