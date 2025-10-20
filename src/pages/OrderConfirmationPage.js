import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <>
      <main className="bg-base-light min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Cảm ơn bạn đã đặt hàng</h1>
            {orderId ? (
              <p className="mb-4">Đơn hàng của bạn đã được đặt. Mã đơn hàng: <span className="font-semibold">{orderId}</span></p>
            ) : (
              <p className="mb-4">Đơn hàng của bạn đã được xử lý.</p>
            )}
            <p className="text-sm text-text-muted mb-6">Chúng tôi sẽ gửi email xác nhận và trạng thái vận chuyển đến bạn.</p>
            <div className="flex justify-center gap-3">
              <Link to="/" className="bg-primary text-white px-4 py-2 rounded">Về trang chủ</Link>
              <Link to="/productlist" className="border px-4 py-2 rounded">Tiếp tục mua sắm</Link>
            </div>
          </div>
        </div>
      </main>
      <BackToTopButton />
    </>
  );
}
