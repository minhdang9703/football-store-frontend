export async function getProducts() {
  const res = await fetch("/data.json");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getProductById(id) {
  // simple helper that fetches all and finds by id
  const products = await getProducts();
  return products.find((p) => p.id?.toString() === id?.toString()) || null;
}
