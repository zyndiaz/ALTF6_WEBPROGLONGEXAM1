import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { createToken } from "../utils/token.js";

const router = express.Router();
const userResponse = (user) => user.toJSON();

router.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({ message: "First name, last name, email, and password are required." });
    if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters." });
    if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ token: createToken(user), user: userResponse(user) });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password || ""))) return res.status(401).json({ message: "Incorrect email or password." });
    if (!user.isActive) return res.status(403).json({ message: "This account has been deactivated." });
    res.json({ token: createToken(user), user: userResponse(user) });
  } catch (error) { next(error); }
});

router.get("/me", requireAuth, (req, res) => res.json(userResponse(req.user)));
router.patch("/me", requireAuth, async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (email && email.toLowerCase() !== req.user.email && await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account with this email already exists." });
    ["firstName", "lastName", "email"].forEach((field) => { if (req.body[field] !== undefined) req.user[field] = req.body[field]; });
    await req.user.save(); res.json(userResponse(req.user));
  } catch (error) { next(error); }
});
router.patch("/change-password", requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!currentPassword || !newPassword || newPassword.length < 8) return res.status(400).json({ message: "Provide your current password and a new password of at least 8 characters." });
    if (!(await user.comparePassword(currentPassword))) return res.status(401).json({ message: "Current password is incorrect." });
    user.password = newPassword; await user.save(); res.json({ message: "Password changed successfully." });
  } catch (error) { next(error); }
});
export default router;
