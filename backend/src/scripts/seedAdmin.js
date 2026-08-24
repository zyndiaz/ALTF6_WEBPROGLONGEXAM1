import "dotenv/config";
import { connectDatabase } from "../config/database.js";
import User from "../models/User.js";

try {
  await connectDatabase();
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first.");
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  let admin = await User.findOne({ email }).select("+password");
  if (!admin) admin = new User({ firstName: "Bulldogs", lastName: "Administrator", email, password: process.env.ADMIN_PASSWORD, role: "admin", isActive: true });
  else { admin.role = "admin"; admin.isActive = true; admin.password = process.env.ADMIN_PASSWORD; }
  await admin.save();
  console.log(`Admin ready: ${admin.email}`); process.exit(0);
} catch (error) { console.error(error.message); process.exit(1); }
