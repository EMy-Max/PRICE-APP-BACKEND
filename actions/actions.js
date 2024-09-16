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
    // console.log(savedBook);
    revalidateTag("books");
    return { message: "New book added" };
  } catch (error) {
    return { error: "Something Went Wrong While Adding Book" };
  }
};

export const updateBook = async (updateData) => {
  try {
    const { bookId, data } = updateData;
    const student = await Book.findByIdAndUpdate(bookId, { ...data });
    if (!student) {
      return { error: "Book Not Found" };
    }
    revalidateTag("books");

    revalidatePath("/admin/dashboard");
    return { message: "Book Succesfully Added" };
  } catch (error) {
    return { error: "Something went wrong while updating book" };
  }
};

export const addAuthor = async (data) => {
  const { bookId, author } = data;
  try {
    const student = await Book.findByIdAndUpdate(bookId, {
      $push: {
        authors: author,
      },
    });
    if (!student) {
      return { error: "Book Not Found" };
    }
    revalidateTag("books");
    revalidatePath("/admin/dashboard");
    return { message: "Author Succesfully Added" };
  } catch (error) {
    return { error: "Something went wrong while adding author" };
  }
};
