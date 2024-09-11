"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormSuccess from "./form-success";
import FormError from "./form-error";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import {z} from "zod";
// import MyModal from "../MyModal";
// import { useChangePassword } from "@/hooks/useVerifyEmail";

export const loginSchema = z.object({
  email:z.string().email(),
  password:z.string().min(5,"Please input password"),
})

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [visibility, setVisibility] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  // if login is successful route to monitor page
  async function onSubmit(data) {
    // return console.log(data)
    setLoading(true);
    const { email, password } = data;
    setError("");
    setSuccess("");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        toast.success("✅ Welcome Admin");
        setLoading(false);
        setSuccess("Welcome Admin!");
        return router.refresh();
      }
      setLoading(false);
      if (res.error) throw new Error(res.error);
    } catch (error) {
      setLoading(false);
      if (error) {
        switch (error.message) {
          case "CredentialsSignin":
            return setError("Invalid info, please retry or register");
            break;
          default:
            error.message;
            return setError(error.message);
            break;
        }
      }
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-full py-10 md:py-14 bg-white min-h-dvh">
      <Card className="w-[350px]  shadow-md">
        <CardHeader>
          <CardTitle className="text-brand mb-2">Welcome Back!</CardTitle>
          <CardDescription>
            Use your registered email address and password to login.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {" "}
            <CardContent className="w-full flex flex-col gap-4 justify-center items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        {...field}
                        disabled={isPending}
                        type="email"
                        className="w-72 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <div
                      className="w-72 flex 
                     items-center justify-center 
                 rounded-md "
                    >
                      {" "}
                      <FormControl>
                        <Input
                          placeholder="******"
                          type={visibility ? "text" : "password"}
                          {...field}
                          disabled={isPending}
                          className="w-72 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                        />
                      </FormControl>
                      <span
                        className="cursor-pointer "
                        onMouseDown={() => setVisibility(true)}
                        onMouseUp={() => setVisibility(false)}
                      >
                        <FaRegEyeSlash />
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <MyModal
                trigger={
                  <div className="w-full flex justify-end">
                    <Button
                      variant="primary"
                      className="bg-transperent text-xs font-semibold text-brand2"
                      size="sm"
                      type="button"
                    >
                      Forgotten your Password?
                    </Button>
                  </div>
                }
                content={<VerifyModal />}
              /> */}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {/* ERROR AND SUCCESS MESSAGING ALERTS */}
              <FormSuccess message={success} />
              <FormError message={error} />

              <div className="flex gap-4 ml-auto w-full">
                <Button
                  variant="outline"
                  type="reset"
                  onClick={() => reset()}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 w-full"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Login"}
                </Button>
              </div>
            </CardFooter>
            {/* <CardFooter>
              <Link
                href="/register"
                className="mr-auto whitespace-nowrap text-sm"
              >
                I do not have an account?{" "}
                <span className="text-blue-600 underline">Register here</span>
              </Link>
            </CardFooter> */}
          </form>
        </Form>
      </Card>
    </div>
  );
}

// function VerifyModal() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { mutateAsync } = useChangePassword();
 

//   async function handleChangePassword() {
//     setLoading(true);
//     await mutateAsync({ email });
//     setLoading(false);
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>Enter Your Email</CardTitle>
//           <CardDescription>
//             Please enter email you registered with.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <div className="flex flex-col space-y-3">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter email you registered with..."
//               className="bg-pink-200 placeholder:text-xs placeholder:font-bold"
//             />
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-end">
//           {" "}
//           <Button
//             color="success"
//             variant="shadow"
//             onClick={handleChangePassword}
//           >
//             Submit
//           </Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }


