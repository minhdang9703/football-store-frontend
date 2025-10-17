function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">⚽ Football Store</h1>
      <nav className="space-x-4">
        <a href="#">Trang chủ</a>
        <a href="#">Sản phẩm</a>
        <a href="#">Liên hệ</a>
      </nav>
    </header>
  );
}

export default Header;
