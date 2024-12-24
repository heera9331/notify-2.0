"use client";
import MainSidebar from "@/components/sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { UserProvider, useUser } from "@/contexts/user-context";
import Main from "@/components/main";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-full ">
        <UserProvider>
          <div className="flex overflow-hidden">
            {/* Sidebar  */}
            {localStorage.getItem("user") && <MainSidebar />}
            {/* Main Content */}
            <Main className="flex-grow min-w-[calc(100% - var(--sidebar-width))] bg-gray-100">
              {children}
            </Main>
            <Toaster />
          </div>
          {/* Footer */}
          <footer className="text-center text-gray-500 my-4">
            Designed by Heera Singh
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
