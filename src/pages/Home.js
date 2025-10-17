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
      <Header />
      <main className="bg-base-light">
        <HeroBanner />
        <ProductList />
        <ImageCategories />
        <ShopByPosition />
        <ShopByBrand />
        <Testimonials />
        <BlogSection />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default HomePage;
