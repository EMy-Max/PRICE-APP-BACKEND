import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between p-3 shadow-md items-center bg-[#caf0f8]">
      <h3 className="text-3xl font-bold font-serif ">Seed App</h3>
      <Link href="/login">
      <Button
        variant="primary"
        className="bg-[#669bbc] rounded-xl text-xs text-white hover:bg-opacity-80"
      >
        Login
      </Button>
      </Link>
    </div>
  );
}
