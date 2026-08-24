import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, minlength: 2, maxlength: 120 },
  description: { type: String, trim: true, required: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, trim: true, required: true, maxlength: 80 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  image: { type: String, trim: true, default: "" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
