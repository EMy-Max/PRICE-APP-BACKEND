import Image from "next/image";
import BookForm from "../Forms/BookForm";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { isDev } from "@/lib/const";
import MyModal from "../Modal/MyModal";
import BooksDetails from "./BooksDetails";

const getBooks = async () => {
  const booksApiUrl = isDev
    ? "http://localhost:3000/api/books"
    : "https://seedapp.vercel.app/api/books";

  const res = await fetch(booksApiUrl, {
    next: { tags: ["books"] },
  });
  const data = await res.json();

  return data.books;
};
export default async function BooksPage({ tab }) {
  const books = await getBooks();
  // console.log("books",books);

  if (tab === "add_book") {
    return <BookForm />;
  }
  return (
    <>
      {books.length ? (
        <div className="grid grid-cols-5 gap-4">
          {books?.map((book) => (
            <div
              className="relative w-full h-72 transition hover:delay-300  hover:scale-105 hover:duration-300"
              key={book?._id}
            >
              <Image
                src={book?.imageUrl || "/book.jpg"}
                fill
                className="w-full h-full rounded-md object-cover object-center "
                alt="book image"
              />
              <div className="absolute flex w-full h-full items-center justify-center opacity-0 hover:opacity-100 bg-blue-500 bg-opacity-20 rounded-md">
                <MyModal
                  trigger={
                    <Button
                      variant="primary"
                      className="bg-lime-900 text-gray-100"
                    >
                      View
                    </Button>
                  }
                  content={<BooksDetails book={book} />}
                  title={book?.title}
                  description={book?.aboutBook}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {" "}
          No Book has been added yet
        </div>
      )}
    </>
  );
}
