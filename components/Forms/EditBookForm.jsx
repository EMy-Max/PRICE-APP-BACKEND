"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormSuccess from "./form-success";
import FormError from "./form-error";
import { useSession } from "next-auth/react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { CldUploadButton } from "next-cloudinary";
import { addBook, updateBook } from "@/actions/actions";
import toast from "react-hot-toast";

import { z } from "zod";
const bookSchema = z.object({
  title: z.string().min(3, "Please input Book Title"),
  aboutAuthor: z.string().min(3, "Write about author(s)"),
  aboutBook: z.string().min(3, "Write about book"),
  category: z.string().min(3, "Please select a category"),
  edition: z.string().min(3, "Please put book edition"),
  price: z.string().optional(),
  numberOfPages: z.string().optional(),
  releaseYear: z.string().min(3, "Which year was book released"),
});
export default function EditBookForm({ book }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setLoading] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title,
      aboutAuthor: book?.aboutAuthor,
      aboutBook: book?.aboutBook,
      category: book?.category,
      price: book?.price,
      releaseYear: book?.releaseYear,
      numberOfPages: book?.numberOfPages,
      edition: book?.edition,
    },
  });

  const { reset } = form;

  // if login is successful route to monitor page
  async function onSubmit(data) {
    // return console.log({bookId:book?._id,...data})
    setError("");
    setSuccess("");
    setLoading(false);
    try {
      setLoading(true);
      const res = await updateBook({ bookId: book?._id, data });
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return setError(res.error);
      }
      reset();
      toast.success(res.message);
      setLoading(false);
      setSuccess(res.message);
      return router.refresh();
    } catch (error) {
      toast.error("Something went Wrong");
      setLoading(false);
      return setError("Something went Wrong");
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-full ">
      <div className="w-[350px] md:w-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="w-fit flex flex-col gap-4 justify-start items-center">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title of Book</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What God looks for in his vessel..."
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="outreach">Outreach</SelectItem>
                          <SelectItem value="marriage">Marriage</SelectItem>
                          <SelectItem value="study">Study</SelectItem>
                          <SelectItem value="ministry">Ministry</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="youth">Youth</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aboutAuthor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`About Author(s)`}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="This book was authored ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aboutBook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About the book</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="This Book was a burden..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="releaseYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year first edition was released</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. 1997" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="edition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edition</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Third Edition.."
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Pages</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. 300"
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price of Book</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. 500" {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <FormSuccess message={success} />
              <FormError message={error} />
              <div className="flex gap-4 ml-auto w-full justify-end">
                <Button
                  variant="outline"
                  type="reset"
                  onClick={() => reset()}
                  disabled={isLoading}
                >
                  Clear
                </Button>
                <Button type="submit" className="px-6" disabled={isLoading}>
                  {isLoading ? "Please wait.." : "Update"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
