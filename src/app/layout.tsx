"use client"
import MainSidebar from "@/components/sidebar";
import type { Metadata } from "next";
import "./globals.css";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  Plus,
  ChevronDown,
  Notebook,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import Main from "@/components/main";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Notify Home",
//   description: "Designed and developed by Heera Singh",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-full">
        <div className="flex overflow-hidden w-full">
          {/* <MainSidebar /> */}
          <div className="sidebar bg-gray-100 w-1/5 p-4 border border-right">
            <ul className="flex flex-col gap-2">
              <li className="bg-gray-50 active:bg-white hover:bg-white rounded-lg cursor-pointer">
                <Link className="block py-2 px-4 w-full" href={"/home"}>Home</Link>
              </li>
              <li className="bg-gray-50 active:bg-white hover:bg-white rounded-lg cursor-pointer">
                <Link className="block py-2 px-4 w-full" href={"/notes"}>Notes</Link>
              </li>
              <li className="bg-gray-50 active:bg-white hover:bg-white rounded-lg cursor-pointer">
                <Link className="block py-2 px-4 w-full" href={"/tasks"}>Tasks</Link>
              </li>
              <li className="bg-gray-50 active:bg-white hover:bg-white rounded-lg cursor-pointer">
                <Link className="block py-2 px-4 w-full" href={"/auth"}>Logout</Link>
              </li>
               
            </ul>
          </div>
          <Main>{children}</Main>
        </div>
        <footer className="text-center text-gray-500">
          This is the layout page after the children
        </footer>
      </body>
    </html>
  );
}
