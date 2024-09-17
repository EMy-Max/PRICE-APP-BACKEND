import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";
 connectMongoDB();


 export async function GET(req) {
    try {
      const latestBook = await Book.findOne().sort({ releaseDate: -1 });
      return NextResponse.json([latestBook]);
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }