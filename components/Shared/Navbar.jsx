"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between p-3 shadow-md items-center bg-[#caf0f8]">
      <h3 className="text-3xl font-bold font-serif ">Seed App</h3>
      {session ? (
        <Button
          onClick={() => signOut()}
          variant="primary"
          className="bg-[#669bbc] rounded-xl text-xs text-white hover:bg-opacity-80"
        >
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button
            variant="primary"
            className="bg-[#669bbc] rounded-xl text-xs text-white hover:bg-opacity-80"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
