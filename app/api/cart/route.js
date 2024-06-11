import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import User from "@/models/user";
import { NextResponse } from "next/server";

// add to cart
export async function POST(request) {
    try {
      await connectMongoDB();
      const { bookId, userId} = await request.json();
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);

      if (!user) {
        return NextResponse.json({ error: 'Please log in or register' }, { status: 404 });
      }

      if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
  
      const addBook = await user.cart.push({ book: book._id});
      console.log (addBook)
      await user.save(addBook);
  
      return NextResponse.json({ message: 'Book successfully added to cart' }, { status: 201 });
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
  