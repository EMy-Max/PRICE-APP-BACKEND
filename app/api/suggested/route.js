import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";
 connectMongoDB();


 export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
  
    try {
      if (category) {
        const books = await Book.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } }).limit(4);
        return NextResponse.json([books]);
      } else {
        const suggestedBooks = await Book.find().limit(4);
        return NextResponse.json([suggestedBooks]);
      }
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }