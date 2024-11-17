"use client";
import { UserProvider } from "@/contexts/user-context";
import { ReactNode } from "react";
const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-4/5">
      <UserProvider>{children}</UserProvider>
    </main>
  );
};
export default Main;
