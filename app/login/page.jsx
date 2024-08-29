import { redirect } from "next/navigation";  
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LoginForm from "@/components/Forms/LoginForm";

export default async function LoginPage() { 
  const session = await getServerSession(options); 
   
  if (session) {
    redirect("/authorize");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
