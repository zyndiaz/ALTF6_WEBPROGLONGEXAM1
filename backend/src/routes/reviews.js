import express from "express";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/", requireAuth, requireRole("admin"), async (_req, res, next) => { try { res.json(await Review.find().populate("user", "firstName lastName").populate("product", "name").sort({ createdAt: -1 })); } catch (error) { next(error); } });
router.patch("/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try { const review = await Review.findByIdAndUpdate(req.params.id, { comment: req.body.comment }, { new: true, runValidators: true }); if (!review) return res.status(404).json({ message: "Review not found." }); res.json(review); } catch (error) { next(error); }
});
export const productReviewRouter = express.Router({ mergeParams: true });
productReviewRouter.get("/", async (req, res, next) => { try { res.json(await Review.find({ product: req.params.id }).populate("user", "firstName lastName").sort({ createdAt: -1 })); } catch (error) { next(error); } });
productReviewRouter.post("/", requireAuth, requireRole("customer"), async (req, res, next) => {
  try { if (!(await Product.exists({ _id: req.params.id }))) return res.status(404).json({ message: "Product not found." }); res.status(201).json(await Review.create({ product: req.params.id, user: req.user._id, rating: req.body.rating, comment: req.body.comment })); } catch (error) { next(error); }
});
export default router;
