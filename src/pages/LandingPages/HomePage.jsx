import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProductList from "../../components/ProductList";
import banner from "../../assets/img/nu-banner.png";
import { api } from "../../services/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.products().then((data) => { const list = Array.isArray(data) ? data : data.products || []; setProducts(list.slice(0, 4)); }).catch(() => {}); }, []);
  return <div className="flex w-full flex-col gap-6">
    <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[1.45fr_1fr]"><div className="overflow-hidden rounded-[2rem] border-2 border-blue-900"><img src={banner} alt="NU Banner" className="h-full w-full object-cover" /></div><div className="rounded-[2rem] border-2 border-blue-900 bg-blue-900 p-8 text-blue-50"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">Bulldogs Pride & Spirit</p><h1 className="mt-3 text-3xl font-bold">Welcome to Bulldogs Exchange</h1><p className="mt-4 text-sm leading-7 text-blue-100">Shop official National University merchandise. Browse current products, add items to your cart, and track your order online.</p><div className="mt-6 flex gap-3"><Button to="/products">Shop gear</Button><Button to="/about" variant="primary">Learn more</Button></div></div></div></section>
    <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">Live catalog</p><h2 className="mt-2 text-2xl font-semibold text-blue-900">Featured merchandise</h2><div className="mt-6">{products.length ? <ProductList products={products} /> : <p className="text-blue-800">Visit Products to see the available catalog.</p>}</div><div className="mt-8 text-center"><Button to="/products">View all products</Button></div></section>
  </div>;
}
