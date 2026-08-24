import express from "express";
import User from "../models/User.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const router = express.Router();
router.get("/", requireAuth, requireRole("admin"), async (_req, res, next) => { try { res.json(await User.find().sort({ createdAt: -1 })); } catch (error) { next(error); } });
router.patch("/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try { const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true, runValidators: true }); if (!user) return res.status(404).json({ message: "User not found." }); res.json(user); } catch (error) { next(error); }
});
export default router;
