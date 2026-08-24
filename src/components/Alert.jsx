export default function Alert({ children, type = "error" }) {
  if (!children) return null;
  const colors = type === "success" ? "border-green-700 bg-green-50 text-green-800" : "border-red-700 bg-red-50 text-red-800";
  return <p role="alert" className={`rounded-xl border px-4 py-3 text-sm ${colors}`}>{children}</p>;
}
