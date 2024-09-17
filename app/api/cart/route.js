import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cart from "@/models/cart_purchase";


await connectMongoDB();
// add to cart

// export async function POST(req) {
//   try {
//     // Verify the user's authentication token
//     const token = req.headers.get('authorization')?.split(" ")[1];
//     console.log('Received token:', token);
//     if (!token) {
//       return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.userId;

//     // Get the bookId from the request body
//     const { bookId } = await req.json();

//     // Check if the book is already in the user's library
//     const userLibrary = await UserLibrary.findOne({ userId });
//     if (userLibrary) {
//       const bookExists = userLibrary.books.some((book) => book.bookId.toString() === bookId);
//       if (bookExists) {
//         return new Response(JSON.stringify({ error: 'Book already in library' }), { status: 400 });
//       }
//     }

//     // Check if the user's Cart exists
//     let userCart = await UserCart.findOne({ userId });

//     if (!userCart) {
//       // Create a new Cart for the user
//       userCart = new UserCart({ userId, books: [{ bookId }] });
//     } else {
//       // Check if the book is already in the user's library
//       const bookExists = userCart.books.some((book) => book.bookId.toString() === bookId);

//       if (bookExists) {
//         return new Response(JSON.stringify({ error: 'Book already in cart' }), { status: 400 });
//       }

//       // Add the book to the user's library
//       userCart.books.push({ bookId });
//     }

//     // Save the updated library
//     await userCart.save();

//     return new Response(JSON.stringify({ message: 'Book added to Cart' }), { status: 200 });
//   } catch (error) {
//     console.error('Error adding book to cart:', error);
//     if (error instanceof jwt.JsonWebTokenError) {
//       return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
//     }
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// }

// export async function POST(req) {
//     try {
//       //get token. 
//       const token = req.headers.get("authorization")?.split(" ")[1];
//       console.log("Received token:", token);
//       if (!token) {
//         return NextResponse.json({ message: "please log in" }, { status: 404 });
//       }
      
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("DECODED:", decoded);
//         //get userId and BookId
//       const {userId} = decoded;
//       const {bookId} = await req.json();
//       console.log ('user ID:', userId, 'BOOK ID:', bookId)

//       if (!userId) {
//         return NextResponse.json({error: 'User not found. Please log in'},{status:404})
//     }
//     if (!bookId) {
//         return NextResponse.json({error: 'Invalid Request'},{status:404})
//     }

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       const cart = await Cart.create({ userId });
//       await cart.save();
//     }

//     const book = await Book.findById(bookId)

//     console.log(book)
//     if (!book) {
//         return NextResponse.json({error: 'Book not found'},{status:404})
//     }

//     //const existingBook = cart.bookId.find((id) => id.toString() === book._id.toString());
//     const bookInCart = cart.books.find((id) => id.toString() === book._id.toString());
//     if (bookInCart) {
//         return NextResponse.json({ message: "Book already in cart" });
//     }

//     cart.books.push(bookId);
//     await cart.save();
//     console.log('USER CART: ', cart)

//       return NextResponse.json({ message: 'Book added to Cart' }, { status: 201 });
//     } catch (error) {
//       console.error('Error adding book to cart:', error);
//       return NextResponse.json(
//         { error: 'An error occurred while adding the book to the cart' },
//         { status: 500 }
//       );
//     }
//   }

//view cart
export async function GET(req) {
  try {
      // Get token
      const token = req.headers.get("authorization")?.split(" ")[1];
      console.log("Received token:", token);
      if (!token) {
          return NextResponse.json({ message: "Please log in" }, { status: 401 });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED:", decoded);

      // Get userId from decoded token
      const { userId } = decoded;
      console.log('User ID:', userId);

      if (!userId) {
          return NextResponse.json({ error: 'User not found. Please log in' }, { status: 404 });
      }

      // Find the user's cart
      let cart = await Cart.findOne({ userId }).populate('books');

      if (!cart) {
          return NextResponse.json({ message: "Cart is empty" }, { status: 200 });
      }

      // Return the cart contents
      return NextResponse.json({ cart: cart.books }, { status: 200 });

  } catch (error) {
      console.error('Error viewing cart:', error);
      return NextResponse.json(
          { error: 'An error occurred while viewing the cart' },
          { status: 500 }
      );
  }
}

//delete from cart
export async function DELETE(req) {
  try {
      // Get token
      const token = req.headers.get("authorization")?.split(" ")[1];
      console.log("Received token:", token);
      if (!token) {
          return NextResponse.json({ message: "Please log in" }, { status: 401 });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED:", decoded);

      // Get userId from decoded token and bookId from request body
      const { userId } = decoded;
      const { bookId } = await req.json();
      console.log('User ID:', userId, 'BOOK ID:', bookId);

      if (!userId) {
          return NextResponse.json({ error: 'User not found. Please log in' }, { status: 404 });
      }
      if (!bookId) {
          return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
      }

      // Find the user's cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
          return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }

      // Check if the book is in the cart
      const bookIndex = cart.books.indexOf(bookId);
      if (bookIndex === -1) {
          return NextResponse.json({ error: 'Book not found in cart' }, { status: 404 });
      }

      // Remove the book from the cart
      cart.books.splice(bookIndex, 1);
      await cart.save();

      console.log('Updated USER CART: ', cart);

      return NextResponse.json({ message: 'Book removed from Cart' }, { status: 200 });
  } catch (error) {
      console.error('Error removing book from cart:', error);
      return NextResponse.json(
          { error: 'An error occurred while removing the book from the cart' },
          { status: 500 }
      );
  }
}
  