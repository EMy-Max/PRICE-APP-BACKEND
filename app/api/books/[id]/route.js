import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}) {
    const {id} = params;
    const reqBody= await request.json();
    console.log(reqBody)
    await connectMongoDB();
    await Book.findByIdAndUpdate (id, {...reqBody});
    return NextResponse.json ({message: "Update successful"}, {status:200})
}  
export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const book = await Book.findOne({_id: id}); 
    return NextResponse.json({book}, {status: 200});
}