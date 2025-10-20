import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BackToTopButton from "../components/UI/BackToTopButton";
import { getProducts } from "../api/products";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductCategoryPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const type = query.get("type") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // reset filters/page when type changes
  useEffect(() => {
    setBrand("");
    setSize("");
    setColor("");
    setPage(1);
  }, [type]);

  // derive filter options from loaded products
  const options = useMemo(() => {
    const brands = new Set();
    const sizes = new Set();
    const colors = new Set();
    let min = Infinity;
    let max = 0;
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand);
      if (Array.isArray(p.sizes)) p.sizes.forEach((s) => sizes.add(s));
      if (Array.isArray(p.colors)) p.colors.forEach((c) => colors.add(typeof c === "string" ? c : (c.name || "")));
      if (typeof p.price === "number") {
        min = Math.min(min, p.price);
        max = Math.max(max, p.price);
      }
    });
    if (!isFinite(min)) min = 0;
    return {
      brands: Array.from(brands),
      sizes: Array.from(sizes),
      colors: Array.from(colors),
      priceMin: min,
      priceMax: max,
    };
  }, [products]);

  // default price range set once options available
  useEffect(() => {
    if (options.priceMin !== Infinity && options.priceMax !== 0 && (priceRange[0] === 0 && priceRange[1] === 0)) {
      setPriceRange([options.priceMin, options.priceMax]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.priceMin, options.priceMax]);

  // filter products by 'type' query param plus UI filters
  const filtered = useMemo(() => {
    const t = type.trim().toLowerCase();
    return products.filter((p) => {
      // type match: try brand, category, name or a shoeType field if present
      if (t) {
        const matchesType =
          (p.brand && p.brand.toLowerCase().includes(t)) ||
          (p.category && p.category.toLowerCase().includes(t)) ||
          (p.type && p.type.toLowerCase().includes(t)) ||
          (p.name && p.name.toLowerCase().includes(t));
        if (!matchesType) return false;
      }
      if (brand && p.brand !== brand) return false;
      if (size && !(Array.isArray(p.sizes) ? p.sizes.includes(size) : p.size === size)) return false;
      if (color) {
        const cands = Array.isArray(p.colors) ? p.colors.map((c) => (typeof c === "string" ? c : c.name)) : [p.color && (typeof p.color === "string" ? p.color : p.color?.name)];
        if (!cands.some((c) => c && c === color)) return false;
      }
      if (priceRange && priceRange.length === 2 && typeof p.price === "number") {
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      }
      return true;
    });
  }, [products, type, brand, size, color, priceRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function handleClearFilters() {
    setBrand("");
    setSize("");
    setColor("");
    setPriceRange([options.priceMin, options.priceMax]);
    setPage(1);
  }

  return (
    <>
     
      <main className="bg-base-light min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-secondary">{type ? `Danh mục: ${type}` : "Tất cả sản phẩm"}</h1>
            <div className="text-sm text-text-muted">{filtered.length} sản phẩm</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <aside className="bg-white p-4">
              <h3 className="font-semibold mb-3">Bộ lọc</h3>

              <div className="mb-4">
                <label className="block text-xs text-text-muted mb-1">Thương hiệu</label>
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }} className="w-full p-2 border">
                  <option value="">Tất cả</option>
                  {options.brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-text-muted mb-1">Kích cỡ</label>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => { setSize(""); setPage(1); }} className={`px-2 py-1 border rounded ${size === "" ? "bg-primary text-white" : "bg-white"}`}>Tất cả</button>
                  {options.sizes.map((s) => (
                    <button key={s} type="button" onClick={() => { setSize(s); setPage(1); }} className={`px-2 py-1 border rounded ${size === s ? "bg-primary text-white" : "bg-white"}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-text-muted mb-1">Màu sắc</label>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => { setColor(""); setPage(1); }} className={`px-2 py-1 border rounded ${color === "" ? "bg-primary text-white" : "bg-white"}`}>Tất cả</button>
                  {options.colors.map((c) => (
                    <button key={c} type="button" onClick={() => { setColor(c); setPage(1); }} className={`px-2 py-1 border rounded ${color === c ? "bg-primary text-white" : "bg-white"}`}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-text-muted mb-1">Khoảng giá</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceRange[0] || ""} onChange={(e) => setPriceRange([Number(e.target.value || 0), priceRange[1]])} className="w-1/2 p-2 border" />
                  <input type="number" value={priceRange[1] || ""} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value || 0)])} className="w-1/2 p-2 border" />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setPage(1); }} className="flex-1 bg-cta-hover text-white py-2 font-bold">Áp dụng</button>
                <button onClick={handleClearFilters} className="flex-1 border py-2">Xóa</button>
              </div>
            </aside>

            {/* Products */}
            <section className="lg:col-span-3">
              <div className="bg-white p-4">
                {loading ? (
                  <div>Đang tải...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {pageItems.map((p) => (
                        <Link key={p.id || p.sku || p.name} to={`/products/${p.id || ""}`} className="block border p-3 hover:shadow">
                          <div className="aspect-square mb-2">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="text-sm text-text-muted">{p.brand}</div>
                          <div className="font-semibold text-secondary">{p.name}</div>
                          <div className="font-bold text-cta-hover">{typeof p.price === "number" ? p.price.toLocaleString() + "₫" : p.price}</div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    <nav className="mt-6 flex items-center justify-center" aria-label="Pagination">
                      <button className="px-3 py-1 mx-1 bg-white border rounded disabled:opacity-50" onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1}>Prev</button>
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pnum = i + 1;
                        return (
                          <button key={pnum} onClick={() => setPage(pnum)} className={`px-3 py-1 mx-1 border rounded ${pnum === page ? "bg-primary text-white" : "bg-white"}`}>
                            {pnum}
                          </button>
                        );
                      })}
                      <button className="px-3 py-1 mx-1 bg-white border rounded disabled:opacity-50" onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages}>Next</button>
                    </nav>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <BackToTopButton />
     
    </>
  );
}
