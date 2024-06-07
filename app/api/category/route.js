import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        if (!title || !description) {
          return NextResponse.json(
            { error: "Title and description are required" },
            { status: 400 }
          );
        }
        await connectMongoDB();
        await Category.create({ title, description });
        return NextResponse.json({ message: "New Category Added" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while adding the category" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
      await connectMongoDB();
      const categories = await Category.find({});
      if (!categories) {
        return NextResponse.json({error: "No categories yet!"})
      }
      return NextResponse.json(categories, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "An error occurred while fetching categories" }, { status: 500 });
    }
  }


export async function DELETE(request) {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        try {
        console.log (id);
          await connectMongoDB();
          const deletedCategory = await Category.findByIdAndDelete(id);
          if (!deletedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
          }
          return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ error: "An error occurred while deleting the category" }, { status: 500 });
        }
      }