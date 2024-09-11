import { options } from "@/app/api/auth/[...nextauth]/options";
import BooksPage from "@/components/book/BooksPage";
import BookForm from "@/components/Forms/BookForm";
import LogoutButton from "@/components/Shared/LogoutButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const getBooks = async () => {
  const res = await fetch("http://localhost:3000/api/books", {
    next: { tags: ["books"] },
  });
  const data = await res.json();

  return data.books;
};
// const getBooks = async () => {
//   const { data } = await axios.get("http://localhost:3000/api/books");
//   return data.books;
// };
export default async function DashboardPage({ searchParams }) {
  const tab = searchParams.tab;
  const session = await getServerSession(options);
  if (!session) {
    redirect("/authorize");
  }
  if (session?.user?.role !== "admin") {
    redirect("/authorize");
  }

  return (
    <div className="max-w-[1200px] mx-auto  space-y-5 p-5 bg-white w-full min-h-dvh" >
      <div className="flex justify-between p-2">
        <h2 className="text-2xl font-semibold">Welcome Admin</h2>
        <LogoutButton />
      </div>
      <Card className="flex justify-between p-3 items-center">
        <h3 className="text-xl ">All Books</h3>
        <div className="space-x-3">
          <Link href="?tab=books">
            <Button variant="outline" size="sm">
              Books
            </Button>
          </Link>
          <Link href="?tab=add_book">
            <Button className="bg-lime-800" size="sm">
              Add
            </Button>
          </Link>
        </div>
      </Card>
      <BooksPage tab={tab} />
    </div>
  );
}
