import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickSearch from "./QuickSearch";
import { isDev } from "../../../../lib/const";

const getBook = async (bookId) => {
  const bookApiUrl = isDev
    ? "http://localhost:3000/api/books"
    : "https://seedapp.vercel.app/api/books";
  const res = await fetch(`${bookApiUrl}/${bookId}`, {
    next: { tags: ["books"] },
  });
  const data = await res.json();

  return data.books;
};

export default async function page({ params: { bookId } }) {
  const book = await getBook(bookId);
  // console.log(book);
  return (
    <div>
      <Card className="w-full p-6">Single page</Card>
      <div className="flex gap-5">
        <QuickSearch />
        <div className="p-5 flex gap-3 w-[80%]">
          <div className="w-1/5">
            <div className="relative h-72 w-52 bg-blue-600 rounded-lg "></div>
          </div>
          <div className="w-4/5">kyyykyk</div>
        </div>
      </div>
    </div>
  );
}
