import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true, minlength: 1, maxlength: 50 },
  lastName: { type: String, trim: true, required: true, minlength: 1, maxlength: 50 },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, toJSON: { transform: (_doc, value) => { delete value.password; return value; } } });

userSchema.pre("save", async function hashPassword() {
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.comparePassword = function comparePassword(value) { return bcrypt.compare(value, this.password); };
userSchema.virtual("name").get(function fullName() { return `${this.firstName} ${this.lastName}`; });

export default mongoose.model("User", userSchema);
