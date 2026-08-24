import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication is required." });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user || !user.isActive) return res.status(401).json({ message: "This account is unavailable. Please sign in again." });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
  }
}

export const requireRole = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: "You are not authorized to perform this action." });
