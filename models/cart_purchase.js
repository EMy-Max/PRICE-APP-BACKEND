import mongoose, {Schema} from 'mongoose';


const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: {type: Number},
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;