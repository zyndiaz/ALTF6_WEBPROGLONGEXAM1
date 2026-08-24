import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true, min: 1 }, price: { type: Number, required: true, min: 0 } }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["ongoing", "confirmed", "ready for claiming", "claimed", "cancelled"], default: "ongoing" },
}, { timestamps: true });
orderSchema.virtual("orderNumber").get(function number() { return this._id.toString().slice(-6).toUpperCase(); });
orderSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Order", orderSchema);
