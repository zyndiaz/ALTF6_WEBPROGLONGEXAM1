import { useState } from "react";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { useCart } from "../../context/CartContext";
import { api } from "../../services/api";

export default function CartPage() {
  const { items, changeQuantity, clearCart, total } = useCart(); const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [busy, setBusy] = useState(false);
  const checkout = async () => { if (!items.length) return; setError(""); setBusy(true); try { await api.createOrder({ items: items.map(({ id, quantity }) => ({ product: id, quantity })) }); clearCart(); setSuccess("Your order was placed and is now ongoing."); } catch (err) { setError(err.message); } finally { setBusy(false); } };
  return <section className="mx-auto max-w-4xl px-4 py-8"><h1 className="text-3xl font-bold">Your cart</h1><Alert>{error}</Alert><Alert type="success">{success}</Alert>
    {!items.length ? <p className="mt-5 text-blue-800">Your cart is empty.</p> : <><div className="mt-5 space-y-3">{items.map((item) => <article key={item.id} className="flex items-center justify-between gap-4 rounded-xl border-2 border-blue-900 bg-blue-100 p-4"><div><h2 className="font-semibold">{item.name}</h2><p>₱{item.price.toLocaleString()}</p></div><label className="text-sm">Quantity <input aria-label={`Quantity for ${item.name}`} className="ml-2 w-16 rounded border p-1" type="number" min="0" value={item.quantity} onChange={(e) => changeQuantity(item.id, Number(e.target.value))} /></label></article>)}</div><div className="mt-6 flex items-center justify-between border-t-2 border-blue-900 pt-5"><p className="text-xl font-bold">Total: ₱{total.toLocaleString()}</p><Button variant="primary" onClick={checkout} disabled={busy}>{busy ? "Ordering…" : "Place order"}</Button></div></>}
  </section>;
}
