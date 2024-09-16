"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EditBookForm from "../Forms/EditBookForm";
import toast from "react-hot-toast";
import { addAuthor } from "@/actions/actions";

export default function BooksDetails({ book }) {
  // console.log(book)
  const [editting, setEditting] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onAddAuthor(e) {
    e.preventDefault();
    const form = e.target
    const fd = new FormData(form);
    // return console.log(fd)
    const data = Object.fromEntries(fd);
    setLoading(false);
    try {
      setLoading(true);
      const res = await addAuthor({ bookId: book._id, ...data });
      if (res.error) {
        toast.error(res.error);
        return null;
      }
      toast.success(res.message);
      form.reset();
    } catch (error) {
      toast.error("Something went Wrong");
    } finally {
      setLoading(false);

    }
  }
  return (
    <>
      {editting ? (
        <div>
          <div className="flex justify-between">
            <h3>Edit Book Details</h3>
            <Button onClick={() => setEditting(false)}>X</Button>
          </div>
          <EditBookForm book={book} />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 p-5 ">
          <div className="col-span-1 flex flex-col gap-5">
            <Image
              src={book?.imageUrl}
              width={170}
              height={170}
              alt={book?.title}
            />
            <div className="text-sm ">
              <BookDetailsParagraph title="Category" detail={book?.category} />
              <BookDetailsParagraph title="Edition" detail={book?.edition} />
              <BookDetailsParagraph
                title="Pages"
                detail={book?.numberOfPages || 0}
              />
              <BookDetailsParagraph
                title="Year of Release"
                detail={book?.releaseYear}
              />
              <BookDetailsParagraph title="Price" detail={book?.price} />
            </div>
          </div>
          <div className="col-span-3 flex flex-col justify-between ">
            <div className="flex flex-col justify-evenly gap-2 text-sm">
              <div>
                <h3 className="font-semibold text-lg">About Book</h3>
                <p>{book?.aboutBook}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{`About Author(s)`}</h3>
                <p>{book?.aboutAuthor}</p>
              </div>

              <div>
                <div className="flex justify-between gap-5 p-2 items-center">
                  <h3 className="font-semibold text-lg">{`Author(s)`}</h3>
                  <form className="flex " onSubmit={onAddAuthor}>
                    <input
                      name="author"
                      placeholder="Add Author"
                      className="w-40 outline-none rounded-l-md bg-slate-200 placeholder:text-sm placeholder:p-2"
                    />
                    <button
                      className="bg-green-900 p-2 rounded-r-md text-white text-sm disabled:cursor-none"
                      disabled={loading}
                    >
                      {loading ? "Please Wait ..." : "Add"}
                    </button>
                  </form>
                </div>
                <div className="space-x-3 px-2 text-sm font-semibold">
                  {book?.authors?.map((author, idx) => (
                    <span key={idx}> {author}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-end">
              <Button onClick={() => setEditting(true)}>Edit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BookDetailsParagraph({ title, detail }) {
  return (
    <p className="capitalize">
      {title} <span className="font-semibold">{`: ${detail}`}</span>
    </p>
  );
}
