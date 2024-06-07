import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server"; 

export async function PATCH(request, {params}) {
    try {
    const {id} = params;
    const reqBody = await request.json();
    await connectMongoDB();
    const updatedCategory = await Category.findByIdAndUpdate (id, {...reqBody});
        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
          }
    return NextResponse.json({message: "Category Update Successful"}, {status: 200})
} catch (error) {
    return NextResponse.json({ error: "An error occurred while updating the category" }, { status: 500 });
}
}

export async function GET(request, {params}) {
    try {
    const {id} = params;
    await connectMongoDB();
    const category = await Category.findOne({_id: id}); 
    if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
    return NextResponse.json({category}, {status: 200});        
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json(
          { error: 'An error occurred while fetching the category'},
          { status: 500 }
        );
    }
}