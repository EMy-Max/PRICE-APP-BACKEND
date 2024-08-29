"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { addBook } from "@/actions/actions";
import { bookSchema } from "@/libs/schema";
import toast from "react-hot-toast";


export default function BookForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setLoading] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      aboutAuthor: "",
      aboutBook: "",
      imageUrl: "",
      pfdUrl: "",
      category: "",
      price: "",
      isFree: "",
      releaseYear: "",
      edition: "",
    },
  });

  const { watch, reset, setValue } = form;

  const freeBook = watch("isFree");

  // if login is successful route to monitor page
  async function onSubmit(data) {
    setError("");
    setSuccess("");
    setLoading(false);
    try {
      setLoading(true);
      const res = await addBook(data);
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return setError(res.error);
      }
      toast.success(res.message);
      // reset();
      // setLoading(false);
      // setSuccess(res.message);
      return router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Something went Wrong");
      setLoading(false);
      return setError("Something went Wrong");
    }
  }
  // Handling  BookImg Upload
  async function handleBookImgUpload(result) {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;

      setValue("imageUrl", url);
    }
  }
  // Handling  Book Upload
  async function handleBookUpload(result) {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;

      setValue("pfdUrl", url);
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
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Author</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Gbile Akanni "
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
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Book Cover</FormLabel>

                      <CldUploadButton
                        uploadPreset="rnj0cok5"
                        options={{ sources: ["local"] }}
                        onSuccess={handleBookImgUpload}
                        className=""
                      >
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="w-full "
                            placeholder="Click To Add Book Cover"
                          />
                        </FormControl>
                      </CldUploadButton>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pfdUrl"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Upload Book</FormLabel>

                      <CldUploadButton
                        uploadPreset="rnj0cok5"
                        options={{ sources: ["local"] }}
                        onSuccess={handleBookUpload}
                        className=""
                      >
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="w-full "
                            placeholder="Click To Add Book "
                          />
                        </FormControl>
                      </CldUploadButton>

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
                  name="isFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Is book free?`}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Is book free?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {freeBook === "no" && (
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price of Book</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg. 500"
                            {...field}
                            className=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                  {isLoading ? "Please wait.." : "Add Book"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
