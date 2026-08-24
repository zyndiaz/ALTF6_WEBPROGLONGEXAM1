import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button.jsx";
import ProductList from "../../components/ProductList.jsx";
import Alert from "../../components/Alert";
import { api } from "../../services/api";

const ProductListPage = () => {
  const [products, setProducts] = useState([]); const [search, setSearch] = useState(""); const [category, setCategory] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { api.products().then((data) => setProducts(Array.isArray(data) ? data : data.products || [])).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  const categories = useMemo(() => [...new Set(products.map((p) => p.category?.name || p.category).filter(Boolean))], [products]);
  const filtered = products.filter((p) => { const name = p.name || p.title || ""; const type = p.category?.name || p.category || ""; return name.toLowerCase().includes(search.toLowerCase()) && (!category || type === category); });
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
          Order Now
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
          Browse NU Bulldog Gear
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-blue-800 sm:text-base">
          Explore our collection of authentic National University merchandise. From apparel to accessories, find everything you need to show your Bulldog pride.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            Merchandise Collection
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-blue-900">
            Shop all items
          </h2>
        </div>
        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px]">
          <input aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl border border-blue-300 bg-white px-4 py-3 text-sm" placeholder="Search products" />
          <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-blue-300 bg-white px-4 py-3 text-sm"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <Alert>{error}</Alert>
        {loading ? <p className="text-blue-800">Loading products…</p> : filtered.length ? <ProductList products={filtered} /> : <p className="text-blue-800">No products match your search.</p>}
      </section>
    </div>
  );
};

export default ProductListPage;
