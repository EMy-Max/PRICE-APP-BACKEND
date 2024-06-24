import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cart from "@/models/cart_purchase";


await connectMongoDB();
// add to cart
export async function POST(req) {
    try {
      //get token. 
      const token = req.headers.get("authorization")?.split(" ")[1];
      console.log("Received token:", token);
      if (!token) {
        return NextResponse.json({ message: "please log in" }, { status: 404 });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED:", decoded);
        //get userId and BookId
      const {userId} = decoded;
      const {bookId} = await req.json();
      console.log ('user ID:', userId, 'BOOK ID:', bookId)

      if (!userId) {
        return NextResponse.json({error: 'User not found. Please log in'},{status:404})
    }
    if (!bookId) {
        return NextResponse.json({error: 'Invalid Request'},{status:404})
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      const cart = await Cart.create({ userId });
      await cart.save();
    }
    console.log("========================", cart);

    const book = await Book.findById(bookId)

    console.log(book)
    if (!book) {
        return NextResponse.json({error: 'Book not found'},{status:404})
    }

    //const existingBook = cart.bookId.find((id) => id.toString() === book._id.toString());
    const bookInCart = cart.books.find((id) => id.toString() === book._id.toString());
    if (bookInCart) {
        return NextResponse.json({ message: "Book already in cart" });
    }

    cart.books.push(bookId);
    await cart.save();
    console.log('USER CART: ', cart)



      //the down part is clear
      return NextResponse.json({ message: 'Book added to Cart' }, { status: 201 });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      return NextResponse.json(
        { error: 'An error occurred while adding the book to the cart' },
        { status: 500 }
      );
    }
  }

//view cart
export async function GET() {
    try {
      await connectMongoDB();
      const user = await User.findById(userId).populate('cart.book');
      return NextResponse.json(user.cart, { status: 200 });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return NextResponse.json(
        { error: 'An error occurred while fetching the cart' },
        { status: 500 }
      );
    }
  }
  