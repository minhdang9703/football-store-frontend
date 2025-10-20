import ProductList from "../components/Product/ProductList";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import HeroBanner from "../components/UI/HeroBanner";
import ImageCategories from "../components/Home/ImageCategories";
import QuickSearch from "../components/Home/QuickSearch";
import ShopByBrand from "../components/Home/ShopByBrand";
import ShopByPosition from "../components/Home/ShopByPosition";
import BlogSection from "../components/Home/BlogSection";
import Testimonials from "../components/Home/Testimonials";
import BackToTopButton from "../components/UI/BackToTopButton";

function HomePage() {
  return (
    <>
     
      <main className="bg-base-light">
        <HeroBanner />
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-red-600 uppercase">
              🔥 SẢN PHẨM NỔI BẬT
            </h2>
            <div className="flex-1 border-b border-gray-200"></div>
          </div>
          <p className="mt-2 text-lg text-text-mute d text-center">
            Những đôi giày được săn đón nhất, giúp bạn tỏa sáng trên sân cỏ.
          </p>
        </div>
        <ProductList />
        <ImageCategories />
        <ShopByPosition />
        <ShopByBrand />
        <Testimonials />
        <BlogSection />
      </main>
     
      <BackToTopButton />
    </>
  );
}

export default HomePage;
