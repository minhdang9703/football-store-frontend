import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // forgot password state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetSubmit(e) {
    e.preventDefault();
    setResetError("");
    setResetMessage("");
    if (!resetEmail) {
      setResetError("Vui lòng nhập email.");
      return;
    }
    setResetLoading(true);
    try {
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(u => u.email === resetEmail);
      if (!found) {
        setResetError("Email không tồn tại trong hệ thống.");
        return;
      }
      // generate a simple numeric token (for demo only)
      const token = Math.floor(100000 + Math.random() * 900000).toString();
      const resetsRaw = localStorage.getItem("passwordResets");
      const resets = resetsRaw ? JSON.parse(resetsRaw) : [];
      resets.push({ email: resetEmail, token, expires: Date.now() + 1000 * 60 * 60 }); // 1h expiry
      localStorage.setItem("passwordResets", JSON.stringify(resets));
      // simulate sending email by showing token (replace with real email API)
      setResetMessage(`Mã đặt lại (mô phỏng): ${token}. Hết hạn trong 1 giờ.`);
    } catch (err) {
      setResetError("Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <>
     
      <main className="bg-base-light min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
          {error && <div className="text-red-600 mb-3">{error}</div>}

          {!showReset ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border" required />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" type="password" className="w-full p-2 border" required />
                <button type="submit" disabled={loading} className="w-full bg-cta-hover text-white py-2 font-bold">
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>
              <div className="mt-3 flex justify-between items-center text-sm">
                <button type="button" onClick={() => setShowReset(true)} className="text-primary underline">Quên mật khẩu?</button>
                <div>
                  Chưa có tài khoản? <Link to="/register" className="text-primary font-semibold">Đăng ký</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">Đặt lại mật khẩu</h2>
              {resetError && <div className="text-red-600 mb-2">{resetError}</div>}
              {resetMessage && <div className="text-green-600 mb-2 break-words">{resetMessage}</div>}
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <input value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="Nhập email đã đăng ký" type="email" className="w-full p-2 border" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={resetLoading} className="flex-1 bg-cta-hover text-white py-2 font-bold">
                    {resetLoading ? "Đang gửi..." : "Gửi mã đặt lại"}
                  </button>
                  <button type="button" onClick={() => { setShowReset(false); setResetMessage(""); setResetError(""); }} className="flex-1 border py-2">Hủy</button>
                </div>
              </form>
              {/* <div className="mt-2 text-xs text-text-muted">Lưu ý: Đây là chế độ mô phỏng. Trong ứng dụng thật, mã đặt lại sẽ được gửi tới email của bạn.</div> */}
            </>
          )}
        </div>
      </main>
      <BackToTopButton />
    
    </>
  );
}
