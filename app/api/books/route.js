import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, authors, aboutAuthor, aboutBook, imageUrl, category, price, isFree } = await request.json();
        
        if (!title || !authors) {
            return NextResponse.json({ message: "Title and author are required" }, { status: 400 });
        }

        await connectMongoDB();
        const newBook = await Book.create({ title, authors, aboutAuthor, aboutBook, imageUrl, category, price, isFree });
        return NextResponse.json({ message: "New book added", book: newBook }, { status: 201 });
    } catch (error) {
        console.error("Error creating book:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const books = await Book.find();
        return NextResponse.json({ books });
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Book ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}



// import connectMongoDB from "@/libs/mongodb";
// import Book from "@/models/books";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     const {title, author, aboutAuthor, aboutBook, imageUrl, category, price, isFree} = await request.json();
//     await connectMongoDB();
//     await Book.create({title, author, aboutAuthor, aboutBook, imageUrl, category, price, isFree});
//     return NextResponse.json({message: "New book added"}, {status:201});
// }

// export async function GET(){
//     await connectMongoDB();
//     const books = await Book.find();
//     return NextResponse.json({books});
// }

// export async function DELETE(request){
//     const id = request.nextUrl.searchParams.get("id");
//     await connectMongoDB();
//     await Book.findByIdAndDelete(id);
//     return NextResponse.json({message: "Book deleted"}, {status: 200})
// }