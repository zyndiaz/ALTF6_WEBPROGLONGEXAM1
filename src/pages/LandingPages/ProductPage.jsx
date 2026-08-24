import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import productImages from "../../assets/product-images";
import Alert from "../../components/Alert";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function ProductPage() {
  const { id } = useParams(); const [product, setProduct] = useState(null); const [reviews, setReviews] = useState([]); const [error, setError] = useState(""); const [review, setReview] = useState({ rating: 5, comment: "" }); const { user } = useAuth(); const { addItem } = useCart();
  useEffect(() => { api.product(id).then((data) => { setProduct(data); return api.reviews(id); }).then((data) => setReviews(Array.isArray(data) ? data : data.reviews || [])).catch((err) => setError(err.message)); }, [id]);
  const imageSrc = product?.imageUrl || product?.image || productImages[product?.name];
  const addToCart = () => { if (!user) return setError("Please log in before adding an item to your cart."); addItem(product); };
  const submitReview = async (event) => { event.preventDefault(); try { const saved = await api.createReview(id, { ...review, rating: Number(review.rating) }); setReviews((current) => [saved, ...current]); setReview({ rating: 5, comment: "" }); } catch (err) { setError(err.message); } };

  if (!product && !error) return <p className="p-8 text-center text-blue-900">Loading product…</p>;
  if (!product) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-blue-900">
              Product not found
            </h1>
            <Button to="/products" className="mt-6">
              Back to Products
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/products">Back to Products</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {product.category?.name || product.category}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
            {product.name || product.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-blue-800">
            <span className="font-bold text-blue-900">₱{Number(product.price || 0).toLocaleString()}</span>
            <span>{product.stock ?? product.quantity ?? 0} in stock</span>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-blue-900 bg-blue-200">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name || product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
                {product.category?.name || product.category}
              </div>
            )}
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-amber-900">
            <p className="text-base leading-7 text-amber-800 whitespace-pre-wrap">{product.description || "No description provided."}</p>
          </div>

          <div className="mt-8 border-t-2 border-amber-900 pt-6">
            <Button variant="primary" className="mr-3" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button to="/products">Back to Products</Button>
          </div>
          <Alert>{error}</Alert>
          <section className="mt-8 border-t-2 border-blue-900 pt-6"><h2 className="text-2xl font-bold text-blue-900">Reviews</h2>
            {user && <form onSubmit={submitReview} className="mt-4 grid gap-3 rounded-xl bg-blue-100 p-4"><select value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })} className="rounded-lg border p-2">{[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}</select><textarea required value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} className="rounded-lg border p-2" placeholder="Write your review" /><Button type="submit" variant="primary">Post review</Button></form>}
            <div className="mt-4 space-y-3">{reviews.length ? reviews.map((item) => <article key={item._id || item.id} className="rounded-xl border border-blue-200 p-4"><p className="font-semibold text-blue-900">{"★".repeat(item.rating || 0)} <span className="text-sm font-normal">{item.user?.name || item.userName || "Customer"}</span></p><p className="mt-1 text-sm text-blue-800">{item.comment || item.review}</p></article>) : <p className="text-sm text-blue-800">No reviews yet.</p>}</div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
