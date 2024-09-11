import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";

export const metadata = {
  title: "SEED APP ADMIN DASHBOARD",
  description:
    "Admin dashboard for uploading and managing of books to the book app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(`${inter.className}`,"bg-[#669bbc]")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
