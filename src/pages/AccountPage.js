import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!currentUser) navigate("/login", { replace: true, state: { from: "/account" } });
  }, [currentUser, navigate]);

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orders");
      const arr = raw ? JSON.parse(raw) : [];
      // show only orders for this user if order.userId exists
      const filtered = currentUser ? arr.filter(o => !o.userId || o.userId === currentUser.id) : arr;
      setOrders(Array.isArray(filtered) ? filtered : []);
    } catch {
      setOrders([]);
    }
  }, [currentUser]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleAvatarFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatar(dataUrl);
      if (typeof updateProfile === "function") {
        updateProfile({ avatar: dataUrl });
      } else {
        try {
          // fallback: update localStorage currentUser
          const cur = JSON.parse(localStorage.getItem("currentUser") || "{}");
          cur.avatar = dataUrl;
          localStorage.setItem("currentUser", JSON.stringify(cur));
        } catch {}
      }
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    if (typeof updateProfile === "function") {
      updateProfile({ name, avatar });
    } else {
      try {
        const cur = JSON.parse(localStorage.getItem("currentUser") || "{}");
        cur.name = name;
        cur.avatar = avatar;
        localStorage.setItem("currentUser", JSON.stringify(cur));
      } catch {}
    }
    setEditing(false);
  }

  function formatDate(ts) {
    try {
      const d = new Date(ts);
      return d.toLocaleString();
    } catch {
      return ts;
    }
  }

  if (!currentUser) return null;

  return (
    <>
      
      <main className="bg-base-light min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 bg-white p-6 rounded shadow">
            <div className="flex flex-col items-center">
              <div className="relative">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-32 h-32 rounded-full object-cover border" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 border">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2l3 3M7 21h10" /></svg>
                </label>
              </div>

              <div className="mt-4 text-center">
                {!editing ? (
                  <>
                    <div className="text-lg font-semibold">{currentUser.name}</div>
                    <div className="text-sm text-text-muted">{currentUser.email}</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setEditing(true)} className="px-3 py-1 border rounded">Chỉnh sửa</button>
                      <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Đăng xuất</button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" />
                    <div className="flex gap-2">
                      <button onClick={saveProfile} className="px-3 py-1 bg-cta-hover text-white rounded">Lưu</button>
                      <button onClick={() => { setEditing(false); setName(currentUser.name || ""); }} className="px-3 py-1 border rounded">Hủy</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-text-muted">Liên kết nhanh</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link to="/order-history" className="text-primary">Xem tất cả đơn hàng</Link></li>
                <li><Link to="/productlist" className="text-primary">Tiếp tục mua sắm</Link></li>
              </ul>
            </div>
          </section>

          <section className="lg:col-span-2 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-muted mb-4">Bạn chưa có đơn hàng nào.</p>
                <Link to="/productlist" className="bg-primary text-white px-4 py-2 rounded">Mua ngay</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border rounded p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-text-muted">Mã đơn: <span className="font-semibold">{order.id}</span></div>
                        <div className="text-sm text-text-muted">Ngày: <span className="font-medium">{formatDate(order.date || order.createdAt || order.timestamp)}</span></div>
                        <div className="text-sm">Tổng: <span className="font-bold">{(order.total || 0).toLocaleString()}₫</span></div>
                        <div className="text-xs mt-1 inline-block px-2 py-0.5 bg-gray-100 rounded text-text-muted">{order.status || "Đang xử lý"}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="px-3 py-1 border rounded text-sm">
                          {expandedOrder === order.id ? "Thu gọn" : "Xem chi tiết"}
                        </button>
                        <Link to={`/order-confirmation/${order.id}`} className="px-3 py-1 border rounded text-sm">Xác nhận</Link>
                      </div>
                    </div>

                    {expandedOrder === order.id && (
                      <div className="mt-3 border-t pt-3">
                        <h4 className="text-sm font-semibold mb-2">Sản phẩm</h4>
                        <div className="space-y-2">
                          {(order.items || []).map((it, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img src={it.image || "https://via.placeholder.com/60"} alt={it.name} className="w-12 h-12 object-contain border" />
                              <div className="flex-1">
                                <div className="font-medium">{it.name}</div>
                                <div className="text-xs text-text-muted">Số lượng: {it.quantity} • Kích cỡ: {it.size || "-" } • Màu: {it.color?.name || it.color || "-"}</div>
                              </div>
                              <div className="font-semibold">{(it.price * it.quantity).toLocaleString()}₫</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <BackToTopButton />
    
    </>
  );
}
