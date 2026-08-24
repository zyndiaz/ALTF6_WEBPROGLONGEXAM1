import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { api } from "../../services/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { api.orders().then((data) => setOrders(Array.isArray(data) ? data : data.orders || [])).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <section className="mx-auto max-w-4xl px-4 py-8"><h1 className="text-3xl font-bold">My orders</h1><Alert>{error}</Alert>{loading ? <p className="mt-5">Loading orders…</p> : <div className="mt-5 space-y-3">{orders.length ? orders.map((order) => <article key={order._id || order.id} className="rounded-xl border-2 border-blue-900 bg-blue-100 p-4"><div className="flex flex-wrap justify-between gap-2"><h2 className="font-semibold">Order #{order.orderNumber || order._id || order.id}</h2><span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase">{order.status || "Ongoing"}</span></div><p className="mt-2 text-sm">{order.items?.length || 0} item(s) · ₱{Number(order.total || order.totalAmount || 0).toLocaleString()}</p></article>) : <p className="text-blue-800">You have no orders yet.</p>}</div>}</section>;
}
