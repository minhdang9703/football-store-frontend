import { StarIcon } from '@heroicons/react/20/solid';

function ProductCard({ product }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <div className="bg-white overflow-hidden group transition-all duration-300 hover:shadow-2xl text-center">
      <div className="relative p-4 h-56 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {product.isHotDeal && (
          <div className="absolute top-4 left-4 bg-cta-hover text-white text-xs font-bold px-3 py-1 rounded">
            BÁN CHẠY
          </div>
        )}
        {discount && (
          <div className="absolute top-4 right-0 bg-cta-hover text-white text-sm font-bold px-2 py-1">
            -{discount}%
            <div className="absolute top-0 -left-2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-cta-hover border-b-8 border-b-transparent"></div>
          </div>
        )}
      </div>
      <div className="p-4 pt-0">
        <div className="w-8 h-0.5 bg-cta-hover mx-auto mb-4"></div>
        <a href="#" className="text-sm font-semibold text-secondary uppercase h-16  block hover:text-primary transition-colors">
          {product.name}
        </a>
        <div className="flex justify-center items-baseline gap-2">
          {product.originalPrice && (
            <p className="text-base text-text-muted line-through">
              {product.originalPrice.toLocaleString()}₫
            </p>
          )}
          <p className="text-xl font-bold text-cta-hover">
            {product.price.toLocaleString()}₫
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
