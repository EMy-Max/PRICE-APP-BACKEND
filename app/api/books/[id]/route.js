import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";
 connectMongoDB();

export async function PATCH(request, {params}) {
    const {id} = params;
    const reqBody= await request.json();
    // console.log(params)
    // await connectMongoDB();
    await Book.findByIdAndUpdate (id, {...reqBody});
    return NextResponse.json ({message: "Update successful"}, {status:200})
}  


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('_id');
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        return NextResponse.json({ message: 'Book not found' }, { status: 404 });
      } else {
        return NextResponse.json([book]);
      }
    } catch (err) {
      console.error("Error fetching book:", error);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }

// export async function GET({params}) {
//     console.log(params)

//     // const {id} = params;
//     // const book = await Book.findOne({_id: "id"}); 
//     return NextResponse.json({"book":""}, {status: 200});
// }