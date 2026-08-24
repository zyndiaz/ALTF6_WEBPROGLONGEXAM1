import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { customer: req.user._id };
    res.json(await Order.find(filter).populate("customer", "firstName lastName email").populate("items.product", "name image").sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});
router.post("/", requireAuth, requireRole("customer"), async (req, res, next) => {
  try {
    if (!Array.isArray(req.body.items) || !req.body.items.length) return res.status(400).json({ message: "Your cart cannot be empty." });
    const ids = req.body.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: ids } });
    if (products.length !== ids.length) return res.status(400).json({ message: "One or more products no longer exist." });
    const items = req.body.items.map((item) => {
      const product = products.find((record) => record._id.toString() === item.product);
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || product.stock < quantity) throw new Error(`Insufficient stock for ${product.name}.`);
      return { product: product._id, quantity, price: product.price };
    });
    for (const item of items) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.status(201).json(await Order.create({ customer: req.user._id, items, total }));
  } catch (error) { if (error.message.startsWith("Insufficient stock")) return res.status(400).json({ message: error.message }); next(error); }
});
router.patch("/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const allowed = ["confirmed", "ready for claiming", "claimed", "cancelled"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid order status." });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json(order);
  } catch (error) { next(error); }
});
export default router;
