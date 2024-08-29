"use server";
import connectMongoDB from "@/libs/mongodb";
import { bookSchema } from "@/libs/schema";
import Book from "@/models/books";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

connectMongoDB();

export const addBook = async (data) => {
  // console.log(data);
  try {
    const validateData = bookSchema.safeParse(data);
    if (!validateData.success) {
      return { error: "Please enter all fields" };
    }
    // return console.log(validateData);
    const {
      title,
      author,
      aboutAuthor,
      aboutBook,
      imageUrl,
      pfdUrl,
      category,
      edition,
      isFree,
      price,
      releaseYear,
    } = validateData.data;
    const newBook = new Book({
      title,
      authors: [author],
      aboutAuthor,
      aboutBook,
      imageUrl,
      pfdUrl,
      category,
      price,
      edition,
      isFree: isFree === "yes" ? true : false,
      releaseYear,
    });
    const savedBook = await newBook.save();
    if (!savedBook) return { error: "Book not succesfully added" };
    console.log(savedBook)
    revalidateTag('books')
    return { message: "New book added" };
  } catch (error) {
    return { error: "Something Went Wrong While Adding Book" };
  }
};
