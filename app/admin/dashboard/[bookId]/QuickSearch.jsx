import { Card } from "@/components/ui/card";
import Image from "next/image";

import Link from "next/link";
const getBooks = async () => {
  const res = await fetch("http://localhost:3000/api/books", {
    next: { tags: ["books"] },
  });
  const data = await res.json();

  return data.books;
};
export default async function QuickSearch({ tab }) {
  const books = await getBooks();

  if (tab === "edit") {
    return <div>Edit</div>;
  }
  return (
    <Card className="flex flex-col w-[200px] h-fit gap-3 p-3 ">
      {books?.map(({ _id, title }) => (
        <Link
          key={_id}
          href={`/admin/dashboard/${_id}`}
          className="line-clamp-1 p-1 hover:bg-blue-600 hover:text-white rounded-md"
        >
          {title}
        </Link>
      ))}
    </Card>
  );
}
