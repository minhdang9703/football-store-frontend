import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useCart } from '../context/CartContext';
import ProductSidebar from '../components/Product/ProductSidebar';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(''); // Ảnh được chọn bởi người dùng (khi click)
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.id.toString() === id);
        setProduct(foundProduct);
        if (foundProduct) {
          setMainImage(foundProduct.image);
          setSelectedImage(foundProduct.image); // Đặt ảnh gốc làm ảnh được chọn ban đầu
        }
      });
  }, [id]);

  const handleAddToCart = (buyNow = false) => {
    const itemToAdd = {
      ...product,
      quantity: 1, 
    };
    addToCart(itemToAdd);
    if (buyNow) {
      navigate('/cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <>
      <Header />
      <main className="bg-base-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-text-muted mb-4">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRightIcon className="h-4 w-4 mx-1" />
            <span className="font-semibold text-secondary">{product.name}</span>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Section */}
                  <div>
                    <div className="border mb-4 aspect-square">
                      <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="grid grid-cols-5 gap-2" onMouseLeave={() => setMainImage(selectedImage)}>
                      {product.gallery?.map((img, index) => (
                        <div 
                          key={index} 
                          className={`border-2 cursor-pointer aspect-square ${selectedImage === img ? 'border-primary' : 'border-transparent'}`} 
                          onMouseEnter={() => setMainImage(img)}
                          onClick={() => setSelectedImage(img)}
                        >
                          <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div>
                    <h1 className="text-2xl font-bold text-secondary font-poppins mb-2">{product.name}</h1>
                    <p className="text-sm text-text-muted mb-4">Thương hiệu: <span className="text-accent font-semibold">{product.brand}</span> | SKU: {product.sku}</p>
                    
                    <div className="bg-gray-100 p-4 mb-4">
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-cta-hover">{product.price.toLocaleString()}₫</p>
                        {discount && (
                          <span className="bg-cta-hover text-white text-sm font-bold px-2 py-0.5 ml-2">-{discount}%</span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <p className="text-base text-text-muted line-through">{product.originalPrice.toLocaleString()}₫</p>
                      )}
                    </div>

                    <div className="flex gap-4 mb-6">
                      <button onClick={() => handleAddToCart(true)} className="flex-1 bg-accent text-white font-bold py-3 uppercase">Mua ngay</button>
                      <button onClick={() => handleAddToCart(false)} className="flex-1 border border-accent text-accent font-bold py-3 uppercase hover:bg-accent hover:text-white transition">Thêm vào giỏ hàng</button>
                    </div>

                    {/* Promotions */}
                    <div className="border p-4">
                      <h3 className="font-bold text-secondary mb-2">Khuyến mãi liên quan</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Nhập mã <span className="font-bold text-cta-hover">KICK100</span> giảm 100.000đ cho đơn từ 2.000.000đ</li>
                        <li>Miễn phí vận chuyển cho đơn từ 500.000đ</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Specs Section */}
                <div className="mt-8 pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
                    <ul className="space-y-2 text-sm">
                        {product.specs && Object.entries(product.specs).map(([key, value]) => (
                            <li key={key} className="grid grid-cols-3 gap-4">
                                <span className="text-text-muted">{key}</span>
                                <span className="col-span-2 font-semibold text-secondary">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3">
                <ProductSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
