import mongoose, {Schema} from 'mongoose';
import Book from './books';


const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    price: {type: Number},
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;