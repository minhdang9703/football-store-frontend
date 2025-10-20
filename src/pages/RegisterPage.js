import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirmPwd) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate("/account");
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      
      <main className="bg-base-light min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
          {error && <div className="text-red-600 mb-3">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Họ và tên" className="w-full p-2 border" required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border" required />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" type="password" className="w-full p-2 border" required />
            <input value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="Xác nhận mật khẩu" type="password" className="w-full p-2 border" required />
            <button type="submit" disabled={loading} className="w-full bg-cta-hover text-white py-2 font-bold">
              {loading ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </form>
          <div className="mt-4 text-sm">
            Đã có tài khoản? <Link to="/login" className="text-primary font-semibold">Đăng nhập</Link>
          </div>
        </div>
      </main>
      <BackToTopButton />
    
    </>
  );
}
