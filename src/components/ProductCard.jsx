import Button from "./Button";
import productImages from "../assets/product-images";

const ProductCard = ({ product, index }) => {
  const imageSrc = product.imageUrl || product.image || productImages[product.name];
  const id = product._id || product.id || product.slug;
  const description = product.description || product.content?.[0] || "Official Bulldogs Exchange merchandise.";

  return (
    <article className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-blue-200">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
        {(product.category?.name || product.category || "Gear").substring(0, 3)}
          </div>
        )}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
        {product.category?.name || product.category || "Gear"} {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-blue-900">
        {product.name || product.title}
      </h3>
      <p className="mt-2 text-base font-bold text-blue-900">₱{Number(product.price || 0).toLocaleString()}</p>
      <p className="mt-3 text-sm leading-6 text-blue-800">
        {description.substring(0, 120)}{description.length > 120 ? "…" : ""}
      </p>
      <Button to={`/products/${id}`} className="mt-4">
        View Product
      </Button>
    </article>
  );
};

export default ProductCard;
