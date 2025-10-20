import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-6 w-6 text-secondary" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-6 w-6 text-secondary" />
    </button>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-base-light" id="sản-phẩm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="overflow-hidden">
          <Slider {...settings}>
            {products.map((p) => (
              <div key={p.id} className="px-4 py-4">
                <ProductCard product={p} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
