import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";

connectMongoDB();

// export async function GET() {
//   try {
//     const books = await Book.find();
//     return NextResponse.json({ books });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('query');

  try {
    if (category) {
      const books = await Book.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
      return NextResponse.json(books);
    } else {
      const books = await Book.find();
      return NextResponse.json(books);
    }
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
