import Image from "next/image";
import BookForm from "../Forms/BookForm";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

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
          {books?.map(({ _id, imageUrl }) => (
            <Link
              className="relative w-full h-72 transition hover:delay-300  hover:scale-105 hover:duration-300"
              key={_id}
              href={`/admin/dashboard/${_id}`}
            >
              <Image
                src={imageUrl || "/book.jpg"}
                fill
                className="w-full h-[full] rounded-md object-cover object-center "
                alt="book image"
              />
            </Link>
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
