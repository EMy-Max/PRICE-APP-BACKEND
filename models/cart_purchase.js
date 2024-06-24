import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
}, {
  timestamps: true,
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
