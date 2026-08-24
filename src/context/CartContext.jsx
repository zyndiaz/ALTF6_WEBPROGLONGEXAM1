import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const readCart = () => { try { return JSON.parse(localStorage.getItem("bulldogs_cart")) || []; } catch { return []; } };

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  useEffect(() => localStorage.setItem("bulldogs_cart", JSON.stringify(items)), [items]);
  const addItem = (product) => setItems((current) => {
    const id = product._id || product.id;
    const found = current.find((item) => item.id === id);
    return found ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { id, name: product.name || product.title, price: Number(product.price), quantity: 1, image: product.image }];
  });
  const changeQuantity = (id, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
  return <CartContext.Provider value={{ items, addItem, changeQuantity, clearCart: () => setItems([]), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) }}>{children}</CartContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
