import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import ProductSidebar from '../components/Product/ProductSidebar';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import BackToTopButton from '../components/UI/BackToTopButton';
import { getProductById } from "../api/products";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(''); // Ảnh được chọn bởi người dùng (khi click)
  // selection state for passing to cart
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getProductById(id).then((foundProduct) => {
      if (!mounted) return;
      setProduct(foundProduct);
      if (foundProduct) {
        setMainImage(foundProduct.image);
        setSelectedImage(foundProduct.image); // Đặt ảnh gốc làm ảnh được chọn ban đầu
        // initialize default size/color if available
        if (foundProduct.sizes && foundProduct.sizes.length) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        if (foundProduct.colors && foundProduct.colors.length) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    }).catch(() => { /* ignore */ });
    return () => { mounted = false; };
  }, [id]);

  const handleAddToCart = (buyNow = false) => {
    const itemToAdd = {
      ...product,
      quantity: 1,
      // include selected options so cart can show them
      size: selectedSize || product.size || null,
      color: selectedColor || product.color || null
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

                    {/* Size selector (if sizes available) */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-text-muted mb-2">Chọn kích cỡ</div>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSelectedSize(s)}
                              className={`px-3 py-1 border rounded ${selectedSize === s ? 'bg-primary text-white' : 'bg-white'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color selector (if colors available) */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-text-muted mb-2">Chọn màu</div>
                        <div className="flex gap-2 items-center">
                          {product.colors.map((c, idx) => {
                            // support string color or object { name, hex, image }
                            const colorName = typeof c === 'string' ? c : c.name;
                            const swatchStyle = typeof c === 'object' && c.hex ? { backgroundColor: c.hex } : {};
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedColor(c)}
                                className={`w-8 h-8 rounded-full border ${selectedColor === c ? 'ring-2 ring-primary' : ''} flex items-center justify-center`}
                                title={colorName}
                                style={swatchStyle}
                              >
                                {(!swatchStyle.backgroundColor) ? <span className="text-xs">{colorName}</span> : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

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
      <BackToTopButton />
      
    </>
  );
}

export default ProductDetailPage;
