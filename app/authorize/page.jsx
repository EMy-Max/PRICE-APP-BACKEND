"use client";

import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Authorize() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("🚩You are not logged in");
      router.push("/login");
    }
    if (status === "authenticated") {
      if (session?.user.role !== "admin") {
        toast.error("🚩You are not authorized ");
        router.push("/");
      }else if(session?.user.role === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [session, status]);


}
