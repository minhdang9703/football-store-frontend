import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import QuickSearch from "../components/Home/QuickSearch";
import BackToTopButton from "../components/UI/BackToTopButton";
import { getProducts } from "../api/products";

export default function ProductListPage() {
	const [page, setPage] = useState(1);
	const pageSize = 12;
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// fetch mock data
	useEffect(() => {
		setLoading(true);
		getProducts()
			.then((d) => setProducts(d))
			.catch(() => setProducts([]))
			.finally(() => setLoading(false));
	}, []);

	const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

	const pages = useMemo(() => {
		// show a small window of pages (max 7 items)
		const maxButtons = 7;
		const start = Math.max(1, page - Math.floor(maxButtons / 2));
		const end = Math.min(totalPages, start + maxButtons - 1);
		const arr = [];
		for (let i = start; i <= end; i++) arr.push(i);
		return arr;
	}, [page, totalPages]);

	function goTo(newPage) {
		if (newPage < 1 || newPage > totalPages || newPage === page) return;
		setPage(newPage);
		// optionally scroll to top of list:
		window.scrollTo({ top: 200, behavior: "smooth" });
	}

	// derive current page items from loaded mock data
	const pageItems = useMemo(() => {
		const start = (page - 1) * pageSize;
		return products.slice(start, start + pageSize);
	}, [products, page, pageSize]);

	return (
		<>
			<Header />
			<main className="bg-base-light min-h-screen py-8">
				<div className="container mx-auto px-4">
					<QuickSearch />
					<div className="bg-white p-4">
						{loading ? (
							<div>Đang tải...</div>
						) : (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{pageItems.map((p) => (
									<a key={p.id || p.sku || p.name} href={`/products/${p.id || ""}`} className="block border p-3 hover:shadow">
										<div className="aspect-square mb-2">
											<img src={p.image} alt={p.name} className="w-full h-full object-contain" />
										</div>
										<div className="text-sm text-text-muted">{p.brand}</div>
										<div className="font-semibold text-secondary">{p.name}</div>
										<div className="font-bold text-cta-hover">{typeof p.price === "number" ? p.price.toLocaleString() + "₫" : p.price}</div>
									</a>
								))}
							</div>
						)}
					</div>
					{/* Pagination */}
					<nav className="mt-6 flex items-center justify-center" aria-label="Pagination">
						<button
							className="px-3 py-1 mx-1 bg-white border rounded disabled:opacity-50"
							onClick={() => goTo(page - 1)}
							disabled={page === 1}
						>
							Prev
						</button>

						{pages[0] > 1 && (
							<>
								<button className="px-3 py-1 mx-1 bg-white border rounded" onClick={() => goTo(1)}>
									1
								</button>
								{pages[0] > 2 && <span className="mx-1">…</span>}
							</>
						)}

						{pages.map((p) => (
							<button
								key={p}
								onClick={() => goTo(p)}
								className={`px-3 py-1 mx-1 border rounded ${p === page ? "bg-primary text-white" : "bg-white"}`}
							>
								{p}
							</button>
						))}

						{pages[pages.length - 1] < totalPages && (
							<>
								{pages[pages.length - 1] < totalPages - 1 && <span className="mx-1">…</span>}
								<button className="px-3 py-1 mx-1 bg-white border rounded" onClick={() => goTo(totalPages)}>
									{totalPages}
								</button>
							</>
						)}

						<button
							className="px-3 py-1 mx-1 bg-white border rounded disabled:opacity-50"
							onClick={() => goTo(page + 1)}
							disabled={page === totalPages}
						>
							Next
						</button>
					</nav>
				</div>
			</main>
			<BackToTopButton />
			<Footer />
		</>
	);
}