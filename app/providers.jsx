"use client";
import { useState } from "react";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
// import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function Providers({ children, session }) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={true}
      refetchInterval={5 * 60}
    >
      {children}
      <Toaster position="top-center" />
    </SessionProvider>
  );
}


