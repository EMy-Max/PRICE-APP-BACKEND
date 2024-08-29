import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Library from "@/models/library";
import Book from "@/models/books";
import connectMongoDB from "@/libs/mongodb";

connectMongoDB()

export async function POST(req) {
  try {
    //get token. if this doesnt work, use danny's code
    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log("Received token:", token);
    if (!token) {
      return NextResponse.json({ message: "please log in" }, { status: 404 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    const {userId} = decoded;
    const {bookId} = await req.json();
    console.log ('user ID:', userId, 'BOOK ID:', bookId)
    
    if (!userId) {
        return NextResponse.json({error: 'User not found. Please log in'},{status:404})
    }
    if (!bookId) {
        return NextResponse.json({error: 'Invalid Request'},{status:404})
    }

    let userLibrary = await Library.findOne({ userId });
    if (!userLibrary) {
        const userLibrary = await Library.create ({ userId });
        await userLibrary.save();
        // userLibrary = newLibrary;
      }

    const book = await Book.findById(bookId)

    console.log(book)
    if (!book) {
        return NextResponse.json({error: 'Book not found'},{status:404})
    }

    const existingBook = userLibrary.bookId.find((id) => id.toString() === book._id.toString());
    if (existingBook) {
        return NextResponse.json({ message: "Book already exists in library" });
    }

    userLibrary.bookId.push(bookId);
    await userLibrary.save();
    console.log('USER LIBRARY: ', userLibrary)

    return NextResponse.json(
        {message: 'Book added to library'},
        {status: 201}
    )
  } catch (error) {
    console.log("ERROR ADDING BOOK TO LIBRARY:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET (req) {
  try {
     const token = req.headers.get("authorization")?.split(" ")[1];
     if (!token) {
      return NextResponse.json({message: "Please log in"}, {status: 401})
     }
     console.log ("TOKEN:  ", token)
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const {userId} = decoded;
     console.log("USER ID:  ", userId)
     if (!userId) {
      return NextResponse.json({ error: 'User not found. Please log in' }, { status: 404 });
      }
      let userLibrary = await Library.findOne({ userId }).populate('bookId');
      if (!userLibrary) {
      return NextResponse.json({ message: "User library not found" }, { status: 404 });
      }
      console.log("USER LIBRARY:  ", userLibrary)
      return NextResponse.json(
        { books: userLibrary.bookId },
        { status: 200 }
      );

  } catch (error) {
    console.log("ERROR FETCHING BOOK FROM LIBRARY:", error);
    return NextResponse.json (
      {error: "Internal Server Error"},
      {status: 500}
    )
  }
}