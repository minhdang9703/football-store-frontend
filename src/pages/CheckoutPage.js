import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  // prefer clearCart if available for efficiency
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "cod", // cod or card
    cardNumber: "",
    cardName: "",
    cardExp: "",
    cardCVC: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.fullName || !form.address || !form.city || !form.country) {
      return "Vui lòng điền đầy đủ thông tin giao hàng.";
    }
    if (form.paymentMethod === "card") {
      if (!form.cardNumber || !form.cardName || !form.cardExp || !form.cardCVC) {
        return "Vui lòng điền đầy đủ thông tin thẻ.";
      }
    }
    if (cartItems.length === 0) return "Giỏ hàng trống.";
    return "";
  }

  async function placeOrder(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);

    try {
      // Adjust endpoint as needed for your backend
      const payload = {
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country
        },
        payment: {
          method: form.paymentMethod,
          // NOTE: sending raw card data here is only for demo; in production use a secure payment gateway/tokenization
          card: form.paymentMethod === "card" ? {
            number: form.cardNumber,
            name: form.cardName,
            exp: form.cardExp,
            cvc: form.cardCVC
          } : null
        },
        items: cartItems.map(it => ({
          productId: it.productId || it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          size: it.size,
          color: it.color?.name
        })),
        total
      };

    //   const res = await fetch("/api/orders", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload)
    //   });
      
    //   if (!res.ok) {
    //     const text = await res.text();
    //     throw new Error(text || "Server error");
    //   }

    //   const data = await res.json();
      const orderId = 12345; // Replace with data.orderId from server response

      // Clear cart: use clearCart if provided, otherwise fall back to per-item removal
      if (typeof clearCart === "function") {
        try { clearCart(); } catch (_) { /* ignore */ }
      } else if (removeFromCart && cartItems.length) {
        for (const it of [...cartItems]) {
          try { removeFromCart(it.cartItemId); } catch (_) { /* ignore */ }
        }
      }

      // Navigate to confirmation page using server-provided order id
      if (orderId) {
        navigate(`/order-confirmation/${orderId}`);
      } else {
        navigate(`/order-confirmation`);
      }
    } catch (err) {
      console.error("Place order error:", err);
      setError("Không thể đặt hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
   
      <main className="bg-base-light min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-secondary mb-6">Thanh toán</h1>
          <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 space-y-4">
              <section>
                <h2 className="font-semibold mb-2">Thông tin giao hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Họ và tên" className="p-2 border" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" className="p-2 border" />
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border" />
                  <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Mã bưu chính" className="p-2 border" />
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Thành phố" className="p-2 border" />
                  <input name="country" value={form.country} onChange={handleChange} placeholder="Quốc gia" className="p-2 border" />
                </div>
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ giao hàng" className="w-full p-2 border mt-3" rows="3" />
              </section>

              <section>
                <h2 className="font-semibold mb-2">Phương thức thanh toán</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === "cod"} onChange={handleChange} />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={handleChange} />
                    <span>Thẻ (mô phỏng)</span>
                  </label>
                </div>

                {form.paymentMethod === "card" && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Số thẻ" className="p-2 border" />
                    <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Tên in trên thẻ" className="p-2 border" />
                    <input name="cardExp" value={form.cardExp} onChange={handleChange} placeholder="MM/YY" className="p-2 border" />
                    <input name="cardCVC" value={form.cardCVC} onChange={handleChange} placeholder="CVC" className="p-2 border" />
                  </div>
                )}
              </section>

              {error && <div className="text-red-600">{error}</div>}

              <div className="flex justify-between items-center">
                <button type="submit" disabled={loading} className="bg-cta-hover text-white px-6 py-3 font-bold">
                  {loading ? "Đang xử lý..." : "Đặt hàng"}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="text-text-muted underline">Quay lại</button>
              </div>
            </div>

            <aside className="bg-white p-6">
              <h2 className="font-semibold mb-4">Đơn hàng</h2>
              <div className="space-y-3">
                {cartItems.length === 0 ? (
                  <div className="text-sm text-text-muted">Giỏ hàng của bạn đang trống.</div>
                ) : (
                  cartItems.map(it => (
                    <div key={it.cartItemId} className="flex items-center gap-3 border-b pb-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{it.name}</div>
                        <div className="text-xs text-text-muted">Số lượng: {it.quantity}</div>
                        <div className="text-sm font-bold">{(it.price * it.quantity).toLocaleString()}₫</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Tạm tính</span>
                  <span className="font-bold">{total.toLocaleString()}₫</span>
                </div>
                {/* shipping fee / discounts can be added here */}
                <div className="flex justify-between mt-3 text-lg font-semibold">
                  <span>Tổng</span>
                  <span>{total.toLocaleString()}₫</span>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <BackToTopButton />
      
    </>
  );
}
