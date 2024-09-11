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
export async function GET({params}) {
    console.log(params)

    // const {id} = params;
    // const book = await Book.findOne({_id: "id"}); 
    return NextResponse.json({"book":""}, {status: 200});
}